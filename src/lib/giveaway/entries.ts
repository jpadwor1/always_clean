import { createHash } from 'crypto';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { db } from '@/db';
import { campaign, entrySchema } from './schema';

export class DuplicateEntryError extends Error {}
export const receiptHash = (receipt: string) => createHash('sha256').update(receipt).digest('hex');

export async function findEntryByReceipt(receipt: string) {
  if (!/^[a-f0-9]{64}$/.test(receipt)) return null;
  return db.giveawayEntry.findFirst({
    where: { campaign, receiptHash: receiptHash(receipt) }, select: { id: true },
  });
}

export async function saveEntry(input: z.infer<typeof entrySchema>, receipt: string, consent: {
  legalVersion: string; consentText: string; rulesUrl: string;
}) {
  if (!/^[a-f0-9]{64}$/.test(receipt)) throw new Error('Invalid submission token.');
  // Strip submissionToken and any unknown properties before persisting.
  const entry = entrySchema.parse(input);
  const hash = receiptHash(receipt);
  try {
    return await db.giveawayEntry.create({ data: {
      campaign, email: entry.email, phone: entry.phone,
      payload: { ...entry, rulesUrl: consent.rulesUrl },
      legalVersion: consent.legalVersion, consentText: consent.consentText, receiptHash: hash,
    } });
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') throw error;
    // Unique indexes arbitrate concurrent inserts. Recover only the same request,
    // never another entrant's receipt or a changed submission.
    const existing = await db.giveawayEntry.findUnique({ where: { receiptHash: hash } });
    if (existing && existing.campaign === campaign &&
      JSON.stringify(entrySchema.parse(existing.payload)) === JSON.stringify(entry)) return existing;
    throw new DuplicateEntryError();
  }
}
