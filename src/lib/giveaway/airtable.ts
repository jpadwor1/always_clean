import type { GiveawayEntry } from '@prisma/client';
import { entrySchema } from './schema';

// Airtable is a CRM mirror. Only Neon decides which entries are accepted.
export async function syncEntry(record: GiveawayEntry) {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  if (!token) throw new Error('Airtable credentials are missing.');
  const base = process.env.AIRTABLE_GIVEAWAY_BASE_ID || 'appxxwjvgiV32kyql';
  const table = process.env.AIRTABLE_GIVEAWAY_TABLE_ID || 'tblsWmGejw4QXsWaJ';
  const entry = entrySchema.parse(record.payload);
  const payload = record.payload as Record<string, unknown>;
  const fields = {
    Name: `${entry.firstName} ${entry.lastName}`, Campaign: record.campaign,
    'Entry ID': record.id, 'Receipt Hash': record.receiptHash,
    'First Name': entry.firstName, 'Last Name': entry.lastName,
    Email: entry.email, Phone: entry.phone, Address: entry.address, City: entry.city, ZIP: entry.zip,
    'Owns Home': entry.ownsHome, 'Pool Maintenance': entry.maintenance,
    'Equipment Issues': entry.equipmentIssues, 'Primary Interest': entry.interest,
    'Rules Consent': entry.rulesConsent, 'Contact Consent': entry.contactConsent,
    'Consent Version': record.legalVersion, 'Consent Text': record.consentText,
    'Rules URL': typeof payload.rulesUrl === 'string' ? payload.rulesUrl : '',
    'Submitted At': record.createdAt.toISOString(),
    'UTM Source': entry.utm_source || '', 'UTM Medium': entry.utm_medium || '',
    'UTM Campaign': entry.utm_campaign || '', 'UTM Content': entry.utm_content || '',
  };
  const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(table)}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Stable across delivery attempts, including an uncertain network timeout.
      performUpsert: { fieldsToMergeOn: ['Receipt Hash'] },
      records: [{ fields }],
    }),
    cache: 'no-store', signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Airtable request failed (${response.status}).`);
  const result = await response.json();
  const saved = result.records?.[0];
  if (!saved?.id || saved.fields?.['Entry ID'] !== record.id ||
    saved.fields?.['Receipt Hash'] !== record.receiptHash) throw new Error('Airtable did not confirm the synced entry.');
  return { id: saved.id as string };
}
