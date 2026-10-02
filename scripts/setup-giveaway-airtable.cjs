// Adds missing fields only. Never renames or deletes existing fields or records.
require('@next/env').loadEnvConfig(process.cwd());
const fields = require('../src/lib/giveaway/airtable-fields.json');
const base = process.env.AIRTABLE_GIVEAWAY_BASE_ID || 'appxxwjvgiV32kyql';
const table = process.env.AIRTABLE_GIVEAWAY_TABLE_ID || 'tblsWmGejw4QXsWaJ';
async function request(path, body) {
  const response = await fetch(`https://api.airtable.com/v0/meta/bases/${base}/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Airtable schema request failed (${response.status}).`);
  return response.json();
}
(async () => {
  const schema = await request('tables');
  const existing = schema.tables.find(item => item.id === table);
  if (!existing) throw new Error('Giveaway table not found.');
  for (const field of fields) {
    const found = existing.fields.find(item => item.name === field.name);
    if (found && found.type !== field.type) throw new Error(`Unexpected type for ${field.name}.`);
    if (!found) {
      await request(`tables/${table}/fields`, field);
      console.log(`Created ${field.name}`);
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  console.log('Giveaway fields ready.');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
