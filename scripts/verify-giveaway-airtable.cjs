// Writes clearly labeled synthetic entries to Neon/Airtable and removes only those entries.
if (!process.argv.includes('--write')) {
  console.log('Pass --write to run the real concurrency and sync verification.');
  process.exit(0);
}
require('@next/env').loadEnvConfig(process.cwd());
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
function load(file, modules = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require: name => modules[name] || require(name), process, console, Date, Buffer, URL, URLSearchParams, AbortSignal, fetch });
  return module.exports;
}
const schema = load('src/lib/giveaway/schema.ts');
const config = load('src/lib/giveaway/config.ts');
const storage = load('src/lib/giveaway/entries.ts', { './schema': schema, '@/db': { db } });
const airtable = load('src/lib/giveaway/airtable.ts', { './schema': schema });
const worker = load('src/lib/giveaway/automation.ts', { './schema': schema, './airtable': airtable, '@/db': { db } });
const route = load('src/app/api/giveaway/route.ts', { '@/lib/giveaway/schema': schema, '@/lib/giveaway/config': config, '@/lib/giveaway/entries': storage, '@/lib/giveaway/automation': worker });
const wait = () => new Promise(resolve => setTimeout(resolve, 800));
const base = process.env.AIRTABLE_GIVEAWAY_BASE_ID || 'appxxwjvgiV32kyql';
const table = process.env.AIRTABLE_GIVEAWAY_TABLE_ID || 'tblsWmGejw4QXsWaJ';
const url = 'https://api.airtable.com/v0/' + base + '/' + table;
const tokens = [];
const nextToken = () => { const value = randomBytes(32).toString('hex'); tokens.push(value); return value; };
const run = Date.now();
const data = {
  firstName: 'INTEGRATION CHECK', lastName: 'NOT AN ENTRANT',
  email: 'giveaway-check-' + run + '@example.invalid', phone: '5205550199',
  address: 'Synthetic verification address - not a property', city: 'Florence', zip: '85132',
  ownsHome: 'Yes', maintenance: 'I maintain it myself', equipmentIssues: 'Not sure',
  interest: 'Mainly here for the giveaway', rulesConsent: true, contactConsent: true,
  utm_source: 'integration-verification', utm_medium: 'local', utm_campaign: 'persistence-check', utm_content: 'synthetic',
};
const submit = body => route.POST(new Request('http://localhost:3001/api/giveaway', {
  method: 'POST', headers: { origin: 'http://localhost:3001' }, body: JSON.stringify(body),
}));
async function remote(path, method = 'GET') {
  const response = await fetch(url + path, { method, headers: { Authorization: 'Bearer ' + process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Verification API failed (' + response.status + ').');
  return response.json();
}
(async () => {
  if (!config.giveawayConfig().open) throw new Error('Campaign window is closed; no bypass is used.');
  try {
    const attempts = Array.from({ length: 8 }, () => ({ ...data, submissionToken: nextToken() }));
    const results = await Promise.all(attempts.map(submit));
    assert.equal(results.filter(r => r.status === 200).length, 1);
    assert.equal(results.filter(r => r.status === 409).length, 7);
    const winner = attempts[results.findIndex(r => r.status === 200)];
    const found = await storage.findEntryByReceipt(winner.submissionToken);
    assert.ok(found?.id);
    let saved = await db.giveawayEntry.findUniqueOrThrow({ where: { id: found.id } });
    assert.equal(saved.automationStatus, 'DELIVERED');
    assert.equal(await db.giveawayEntry.count({ where: { campaign: schema.campaign, email: data.email } }), 1);
    await wait();
    const query = new URLSearchParams({ filterByFormula: '{Receipt Hash}="' + saved.receiptHash + '"' });
    let mirror = await remote('?' + query);
    assert.equal(mirror.records.length, 1);
    const fields = mirror.records[0].fields;
    for (const [field, key] of Object.entries({ Email: 'email', Address: 'address', City: 'city', ZIP: 'zip', 'Owns Home': 'ownsHome', 'Pool Maintenance': 'maintenance', 'Equipment Issues': 'equipmentIssues', 'Primary Interest': 'interest', 'Rules Consent': 'rulesConsent', 'Contact Consent': 'contactConsent', 'UTM Source': 'utm_source', 'UTM Medium': 'utm_medium', 'UTM Campaign': 'utm_campaign', 'UTM Content': 'utm_content' })) assert.equal(fields[field], data[key], field);
    assert.equal(fields['Entry ID'], saved.id);
    assert.equal(fields['Consent Text'], saved.consentText);
    assert.equal(fields['Submitted At'], saved.createdAt.toISOString());
    const replays = await Promise.all(Array.from({ length: 4 }, () => submit(winner)));
    assert.ok(replays.every(r => r.status === 200));
    console.log('8 concurrent submissions: 1 accepted, 7 duplicates; 4 same-receipt retries recovered that entry.');
    // Isolate each unique index: shared email with different phones, then shared phone with different emails.
    for (const mode of ['email', 'phone']) {
      const pending = Array.from({ length: 6 }, (_, i) => {
        const candidate = { ...data, email: mode === 'email' ? 'shared-' + run + '@example.invalid' : 'phone-' + i + '-' + run + '@example.invalid', phone: mode === 'phone' ? '5205550180' : '520555017' + i };
        return storage.saveEntry(candidate, nextToken(), config.giveawayConfig());
      });
      const outcomes = await Promise.allSettled(pending);
      assert.equal(outcomes.filter(r => r.status === 'fulfilled').length, 1);
      for (const result of outcomes.filter(r => r.status === 'rejected')) assert.ok(result.reason instanceof storage.DuplicateEntryError);
      console.log('Concurrent ' + mode + ' uniqueness: 1 accepted, 5 duplicates.');
    }
    // Simulate delivery failure for our own record, then retry against the real Airtable API.
    await db.giveawayEntry.update({ where: { id: saved.id }, data: { automationStatus: 'PENDING', automationLeaseAt: null } });
    assert.equal(await worker.deliverEntry(saved.id, async () => { throw new Error('Synthetic provider outage'); }), 'failed');
    assert.ok(await storage.findEntryByReceipt(winner.submissionToken));
    await db.giveawayEntry.update({ where: { id: saved.id }, data: { automationLeaseAt: new Date(0) } });
    await wait();
    assert.equal(await worker.deliverEntry(saved.id), 'delivered');
    await wait();
    mirror = await remote('?' + query);
    assert.equal(mirror.records.length, 1);
    assert.equal(mirror.records[0].fields['Entry ID'], saved.id);
    assert.equal(await storage.findEntryByReceipt(nextToken()), null);
    console.log('Saved entry survived sync failure; retry updated the same Airtable record.');
  } finally {
    const hashes = tokens.map(storage.receiptHash);
    const rows = await db.giveawayEntry.findMany({ where: { receiptHash: { in: hashes } } });
    for (const row of rows) {
      assert.equal(row.payload.firstName, data.firstName);
      assert.equal(row.payload.lastName, data.lastName);
      await wait();
      const query = new URLSearchParams({ filterByFormula: '{Receipt Hash}="' + row.receiptHash + '"' });
      const result = await remote('?' + query);
      for (const record of result.records) {
        assert.equal(record.fields['Entry ID'], row.id);
        await wait();
        assert.equal((await remote('/' + record.id, 'DELETE')).deleted, true);
      }
      await db.giveawayEntry.delete({ where: { id: row.id } });
    }
    assert.equal(await db.giveawayEntry.count({ where: { receiptHash: { in: hashes } } }), 0);
    console.log('Removed all synthetic Neon and Airtable records.');
  }
})().catch(error => { console.error('Verification failed:', error.code || error.name, error instanceof assert.AssertionError ? error.message : 'See the failing stage above.'); process.exitCode = 1; }).finally(() => db.$disconnect());
