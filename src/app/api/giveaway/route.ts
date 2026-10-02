import { NextResponse } from 'next/server';
import { submissionSchema } from '@/lib/giveaway/schema';
import { giveawayConfig } from '@/lib/giveaway/config';
import { DuplicateEntryError, saveEntry } from '@/lib/giveaway/entries';
import { deliverEntry } from '@/lib/giveaway/automation';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const config = giveawayConfig();
  if (!config.open) return NextResponse.json({ error: 'Entries are not currently open.' }, { status: 503 });
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    body = JSON.parse(raw);
  } catch { return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 }); }
  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form fields.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const receipt = parsed.data.submissionToken;
  try {
    const entry = await saveEntry(parsed.data, receipt, config);
    // The saved row is also a durable outbox. Sync failure must not lose an entry.
    try { await deliverEntry(entry.id); } catch { console.error('Giveaway Airtable sync queued for retry'); }
    const response = NextResponse.json({ success: true, redirect: '/giveaway/thank-you' });
    response.cookies.set('giveaway_receipt', receipt, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/giveaway', maxAge: 86400 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    if (error instanceof DuplicateEntryError) {
      return NextResponse.json({ error: 'An entry with these contact details has already been received. Watch your phone and email for updates.' }, { status: 409 });
    }
    console.error('Giveaway entry could not be saved');
    return NextResponse.json({ error: 'We could not save your entry. Please try again.' }, { status: 500 });
  }
}
