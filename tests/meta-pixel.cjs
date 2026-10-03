// Executes the installed SDK against a fake DOM. No requests are sent to Meta.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
test('installed SDK queues the supplied Meta base code and event ID correctly', () => {
  const scripts = []; const window = {}; const module = { exports: {} };
  const document = {
    createElement: () => ({}),
    getElementsByTagName: () => [{ parentNode: { insertBefore: script => scripts.push(script) } }],
  };
  const context = { window, document, module, exports: module.exports, console };
  Object.defineProperty(context, 'fbq', { get: () => window.fbq });
  vm.runInNewContext(fs.readFileSync(require.resolve('react-facebook-pixel'), 'utf8'), context);
  const api = module.exports.default;
  api.init('7174041372672275', undefined, { autoConfig: false, debug: false });
  api.pageView();
  api.fbq('track', 'Lead', { content_name: 'Halloween Pool Pump Giveaway' }, { eventID: 'saved-neon-entry' });
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://connect.facebook.net/en_US/fbevents.js');
  assert.equal(scripts[0].async, true);
  const queue = JSON.parse(JSON.stringify(Array.from(window.fbq.queue, args => Array.from(args))));
  assert.deepEqual(queue[0], ['set', 'autoConfig', false, '7174041372672275']);
  assert.deepEqual(queue[1], ['init', '7174041372672275', {}]);
  assert.deepEqual(queue[2], ['track', 'PageView']);
  assert.equal(queue[3][1], 'Lead');
  assert.deepEqual(queue[3][3], { eventID: 'saved-neon-entry' });
});
