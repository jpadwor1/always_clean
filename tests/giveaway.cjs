// node --test tests/giveaway.cjs — no live database or external messages.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
class DuplicateEntryError extends Error {}
function load(file, mocks = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: name => name in mocks ? mocks[name] : require(name), process, console: { error() {} }, Buffer, Date, Set, URL, ...globals }, { filename: file });
  return module.exports;
}
const schema = load('src/lib/giveaway/schema.ts');
test('Arizona campaign boundaries are enforced without a test-mode bypass', () => {
  const env = { GIVEAWAY_LEGAL_APPROVED: 'true', GIVEAWAY_LEGAL_VERSION: 'v1', GIVEAWAY_RULES_URL: '/approved-rules', GIVEAWAY_CONTACT_CONSENT_TEXT: 'Approved test text' };
  function config(now, overrides = {}) {
    class FixedDate extends Date { constructor(value) { super(value === undefined ? now : value); } }
    return load('src/lib/giveaway/config.ts', {}, { process: { env: { NODE_ENV: 'production', ...env, ...overrides } }, Date: FixedDate }).giveawayConfig();
  }
  assert.equal(config('2026-10-01T06:59:59Z').open, false);
  assert.equal(config('2026-10-01T07:00:00Z').open, true);
  assert.equal(config('2026-11-01T06:59:59Z').open, true);
  assert.equal(config('2026-11-01T07:00:00Z').open, false);
  assert.equal(config('2026-10-15T12:00:00Z', { GIVEAWAY_LEGAL_APPROVED: 'false' }).open, true);
  assert.equal(config('2026-10-15T12:00:00Z', { NODE_ENV: 'development' }).open, true);
  assert.equal(config('2026-09-15T12:00:00Z', { GIVEAWAY_TEST_MODE: 'true' }).open, false);
  assert.equal(config('2026-09-15T12:00:00Z', { NODE_ENV: 'development' }).open, false);
});
const valid = { firstName: 'Test', lastName: 'Entrant', email: ' TEST@example.com ', phone: '+1 (520) 555-0123', address: '123 Test Lane', city: 'Florence', zip: '85132', ownsHome: 'Yes', maintenance: 'I maintain it myself', equipmentIssues: 'Not sure', interest: 'Mainly here for the giveaway', rulesConsent: true, contactConsent: true, utm_source: 'test' };
test('validation normalizes contacts and rejects invalid fields, missing consent and honeypot', () => {
  const result = schema.entrySchema.parse(valid);
  assert.equal(result.email, 'test@example.com'); assert.equal(result.phone, '5205550123');
  for (const patch of [{ phone: '123' }, { email: 'bad' }, { zip: '8513' }, { city: 'Elsewhere' }, { rulesConsent: false }, { contactConsent: false }, { website: 'bot' }, { firstName: ' ' }]) assert.equal(schema.entrySchema.safeParse({ ...valid, ...patch }).success, false);
});
function request(body, origin = 'http://localhost:3001') { return new Request('http://localhost:3001/api/giveaway', { method: 'POST', headers: { origin }, body: JSON.stringify(body) }); }
function route(saveEntry, deliverEntry = async () => 'delivered', open = true) {
  return load('src/app/api/giveaway/route.ts', { '@/lib/giveaway/entries': { saveEntry, DuplicateEntryError }, '@/lib/giveaway/automation': { deliverEntry }, '@/lib/giveaway/schema': schema, '@/lib/giveaway/config': { giveawayConfig: () => ({ open, legalVersion: 'test-v1', consentText: 'test consent', rulesUrl: '/giveaway/rules' }) } });
}
valid.submissionToken = 'a'.repeat(64);
test('Neon saves normalized data before syncing and issuing a receipt', async () => {
  let saved;
  const response = await route(async (entry, receipt, consent) => { saved = { entry, receipt, consent }; return { id: 'entry-1' }; }, async id => { assert.ok(saved); assert.equal(id, 'entry-1'); }).POST(request(valid));
  assert.equal(response.status, 200); assert.equal((await response.json()).success, true);
  assert.match(response.headers.get('set-cookie'), /HttpOnly/i);
  assert.equal(saved.entry.utm_source, 'test'); assert.equal(saved.consent.legalVersion, 'test-v1'); assert.equal(saved.receipt, valid.submissionToken);
});
test('invalid data, closed window and foreign origin cannot save', async () => {
  const fail = async () => assert.fail('must not run');
  assert.equal((await route(fail, fail).POST(request({ ...valid, contactConsent: false }))).status, 400);
  assert.equal((await route(fail).POST(request({ ...valid, submissionToken: '' }))).status, 400);
  assert.equal((await route(fail, fail, false).POST(request(valid))).status, 503);
  assert.equal((await route(fail, fail).POST(request(valid, 'https://foreign.example'))).status, 403);
});
test('duplicates and Neon failure cannot issue receipts', async () => {
  for (const [error, status] of [[new DuplicateEntryError(), 409], [new Error('Neon unavailable'), 500]]) {
    const response = await route(async () => { throw error; }, async () => assert.fail('must not deliver')).POST(request(valid));
    assert.equal(response.status, status); assert.equal(response.headers.get('set-cookie'), null);
  }
});

test('Airtable outage cannot turn a committed entry into a failed submission', async () => {
  const response = await route(async () => ({ id: 'saved' }), async () => { throw new Error('Airtable down'); }).POST(request(valid));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie'), /HttpOnly/i);
});
test('Pixel uses the approved ID when the hosting variable is missing and honors an empty override', async () => {
  for (const [env, expected] of [[{}, '7174041372672275'], [{ NEXT_PUBLIC_META_PIXEL_ID: '' }, undefined]]) {
    let effect; let initialized;
    const component = load('src/components/FacebookPixelEvents.tsx', {
      react: { useEffect: fn => { effect = fn; }, useRef: () => ({ current: null }) },
      'next/navigation': { usePathname: () => '/giveaway' },
      'react-facebook-pixel': { init: id => { initialized = id; }, pageView() {}, track() {} },
    }, { process: { env } });
    component.default({}); effect(); await new Promise(resolve => setImmediate(resolve));
    assert.equal(initialized, expected);
  }
});

test('Meta landing never leads and confirmed entry deduplicates', async () => {
  let effect; let pathname = '/giveaway'; const calls = []; const storage = new Map(); const lastPage = { current: null };
  const api = { init: () => calls.push(['init']), pageView: () => calls.push(['PageView']), track: name => calls.push([name]), fbq: (...args) => calls.push(args) };
  const component = load('src/components/FacebookPixelEvents.tsx', { react: { useEffect: fn => { effect = fn; }, useRef: () => lastPage }, 'next/navigation': { usePathname: () => pathname }, 'react-facebook-pixel': api }, { process: { env: { NEXT_PUBLIC_META_PIXEL_ID: '7174041372672275' } }, localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) } });
  const flush = () => new Promise(resolve => setImmediate(resolve));
  component.default({}); effect(); await flush();
  assert.equal(calls.filter(x => x[0] === 'PageView').length, 1); assert.equal(calls.filter(x => x[0] === 'ViewContent').length, 1); assert.equal(calls.filter(x => x[1] === 'Lead').length, 0);
  pathname = '/giveaway/thank-you'; component.default({}); effect(); await flush();
  assert.equal(calls.filter(x => x[1] === 'Lead').length, 0);
  component.default({ confirmedEntryId: 'saved-entry', pageViews: false }); effect(); await flush(); effect(); await flush();
  assert.equal(calls.filter(x => x[1] === 'Lead').length, 1); assert.equal(calls.filter(x => x[0] === 'init').length, 1);
  assert.equal(calls.filter(x => x[0] === 'PageView').length, 2);
  pathname = '/giveaway'; component.default({}); effect(); await flush(); effect(); await flush();
  assert.equal(calls.filter(x => x[0] === 'PageView').length, 3);
  assert.equal(calls.filter(x => x[0] === 'ViewContent').length, 2);
  await component.trackGiveawayEvent('Contact', 'call-click');
  assert.equal(calls.filter(x => x[1] === 'Contact').length, 1);
});
