const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { Prisma } = require('@prisma/client');
function load(file, mocks = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: name => mocks[name] || require(name), process: { env: { AIRTABLE_PERSONAL_ACCESS_TOKEN: 'unit-token' } }, Date, AbortSignal, Buffer, ...globals });
  return module.exports;
}
const schema = load('src/lib/giveaway/schema.ts');
const entry = { firstName: 'Test', lastName: 'Entrant', email: 'test@example.com', phone: '5205550123', address: '123 Test Lane', city: 'Florence', zip: '85132', ownsHome: 'Yes', maintenance: 'I maintain it myself', equipmentIssues: 'Not sure', interest: 'Mainly here for the giveaway', rulesConsent: true, contactConsent: true, utm_source: 'test' };
const record = { id: 'neon-entry-id', campaign: schema.campaign, email: entry.email, phone: entry.phone, payload: { ...entry, rulesUrl: '/giveaway/rules' }, receiptHash: 'b'.repeat(64), createdAt: new Date('2026-10-02T12:00:00Z'), legalVersion: 'v1', consentText: 'Saved consent copy' };
test('Airtable sync uses stable Neon identifiers, original timestamps and saved consent', async () => {
  const bodies = [];
  const api = load('src/lib/giveaway/airtable.ts', { './schema': schema }, { fetch: async (url, init) => {
    assert.equal(init.cache, 'no-store'); assert.ok(init.signal); assert.equal(init.method, 'PATCH');
    const body = JSON.parse(init.body); bodies.push(body);
    return Response.json({ records: [{ id: 'airtable-record', fields: body.records[0].fields }] });
  } });
  await api.syncEntry(record); await api.syncEntry(record);
  assert.deepEqual(bodies[0], bodies[1]);
  assert.deepEqual(bodies[0].performUpsert.fieldsToMergeOn, ['Receipt Hash']);
  const fields = bodies[0].records[0].fields;
  assert.equal(fields['Entry ID'], record.id); assert.equal(fields['Submitted At'], record.createdAt.toISOString());
  assert.equal(fields['Contact Consent'], true); assert.equal(fields['Consent Text'], record.consentText);
  assert.equal(fields['UTM Source'], 'test'); assert.equal(fields.Email, entry.email);
});
test('provider errors and unconfirmed Airtable writes fail without exposing response bodies', async () => {
  for (const status of [401, 403, 422, 429, 500]) {
    const api = load('src/lib/giveaway/airtable.ts', { './schema': schema }, { fetch: async () => new Response('private details', { status }) });
    await assert.rejects(api.syncEntry(record), error => !error.message.includes('private details'));
  }
  const api = load('src/lib/giveaway/airtable.ts', { './schema': schema }, { fetch: async () => Response.json({ records: [{ id: 'wrong', fields: {} }] }) });
  await assert.rejects(api.syncEntry(record), /did not confirm/);
});
test('unique conflict recovers identical receipts but rejects other contacts or edited payloads', async () => {
  const conflict = new Prisma.PrismaClientKnownRequestError('duplicate', { code: 'P2002', clientVersion: '5' });
  let existing = record; let persisted;
  const storage = load('src/lib/giveaway/entries.ts', { './schema': schema, '@/db': { db: { giveawayEntry: {
    create: async ({ data }) => { persisted = data; throw conflict; },
    findUnique: async () => existing,
  } } } });
  const consent = { legalVersion: 'v1', consentText: record.consentText, rulesUrl: '/giveaway/rules' };
  assert.equal((await storage.saveEntry({ ...entry, submissionToken: 'secret' }, 'a'.repeat(64), consent)).id, record.id);
  assert.ok(!JSON.stringify(persisted).includes('secret'));
  await assert.rejects(storage.saveEntry({ ...entry, address: 'Another address' }, 'a'.repeat(64), consent), storage.DuplicateEntryError);
  existing = null;
  await assert.rejects(storage.saveEntry(entry, 'a'.repeat(64), consent), storage.DuplicateEntryError);
});
test('sync lease prevents overlap, records failure and fences completion writes', async () => {
  let claimAllowed = true; const updates = [];
  const worker = load('src/lib/giveaway/automation.ts', { './schema': schema, './airtable': { syncEntry: async () => {} }, '@/db': { db: { giveawayEntry: {
    updateMany: async args => {
      updates.push(args);
      if (args.data.automationStatus === 'SENDING') { const count = claimAllowed ? 1 : 0; claimAllowed = false; return { count }; }
      return { count: 1 };
    },
    findUniqueOrThrow: async () => record,
  } } } });
  let sent = 0;
  const outcomes = await Promise.all([worker.deliverEntry(record.id, async () => { sent++; }), worker.deliverEntry(record.id, async () => { sent++; })]);
  assert.equal(sent, 1); assert.ok(outcomes.includes('delivered')); assert.ok(outcomes.includes('skipped'));
  const finish = updates.find(x => x.data.automationStatus === 'DELIVERED');
  assert.equal(finish.where.automationStatus, 'SENDING'); assert.ok(finish.where.automationLeaseAt);
  claimAllowed = true;
  assert.equal(await worker.deliverEntry(record.id, async () => { throw new Error('private payload'); }), 'failed');
  assert.equal(updates.at(-1).data.automationError, 'Airtable sync failed; retry required.');
});
test('retry endpoint requires a secret and returns actual worker results', async () => {
  let calls = 0;
  const route = load('src/app/api/giveaway/retry/route.ts', { '@/lib/giveaway/automation': { retryEntries: async () => { calls++; return { delivered: 1, failed: 0, skipped: 0 }; } } }, { process: { env: { GIVEAWAY_RETRY_TOKEN: 'secret' } } });
  assert.equal((await route.POST(new Request('https://example.com'))).status, 401);
  assert.equal(calls, 0);
  const response = await route.POST(new Request('https://example.com', { headers: { Authorization: 'Bearer secret' } }));
  assert.equal(response.status, 200); assert.equal((await response.json()).delivered, 1); assert.equal(calls, 1);
});
