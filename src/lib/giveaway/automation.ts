import { db } from '@/db';
import type { GiveawayEntry, Prisma } from '@prisma/client';
import { campaign } from './schema';
import { syncEntry } from './airtable';

export type SyncResult = 'delivered' | 'failed' | 'skipped';
function ready(now: Date): Prisma.GiveawayEntryWhereInput {
  return { campaign, OR: [
    { automationStatus: { in: ['PENDING', 'FAILED'] }, OR: [
      { automationLeaseAt: null },
      { automationLeaseAt: { lt: new Date(now.getTime() - 30_000) } },
    ] },
    { automationStatus: 'SENDING', automationLeaseAt: { lt: new Date(now.getTime() - 120_000) } },
  ] };
}
export async function deliverEntry(
  id: string,
  send: (entry: GiveawayEntry) => Promise<unknown> = syncEntry,
): Promise<SyncResult> {
  const lease = new Date();
  const claim = await db.giveawayEntry.updateMany({
    where: { id, ...ready(lease) },
    data: { automationStatus: 'SENDING', automationLeaseAt: lease, automationAttempts: { increment: 1 } },
  });
  if (!claim.count) return 'skipped';
  // Lease conditions also fence late workers from overwriting a newer attempt.
  const owned = { id, automationStatus: 'SENDING', automationLeaseAt: lease };
  try {
    const entry = await db.giveawayEntry.findUniqueOrThrow({ where: { id } });
    await send(entry);
    const finished = await db.giveawayEntry.updateMany({
      where: owned,
      data: { automationStatus: 'DELIVERED', automationSentAt: new Date(), automationError: null },
    });
    return finished.count ? 'delivered' : 'skipped';
  } catch {
    await db.giveawayEntry.updateMany({
      where: owned,
      data: { automationStatus: 'FAILED', automationError: 'Airtable sync failed; retry required.' },
    });
    return 'failed';
  }
}
export async function retryEntries() {
  const entries = await db.giveawayEntry.findMany({
    where: ready(new Date()),
    orderBy: [{ automationLeaseAt: { sort: 'asc', nulls: 'first' } }, { createdAt: 'asc' }],
    take: 2, select: { id: true },
  });
  const result = { delivered: 0, failed: 0, skipped: 0 };
  // Bounded serial calls stay under scheduled-function time and API rate limits.
  for (const entry of entries) result[await deliverEntry(entry.id)]++;
  return result;
}
