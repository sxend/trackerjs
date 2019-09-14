import test from 'ava';
import { newtr } from '../src/tr';
import { main } from '../src/main';

function newTr() {
  const tr = newtr();
  main(tr);
  return tr;
}
test('tr object create/remove method', t => {
  const tr = newTr();
  const tracker = tr.create('TEST_TRACKER');
  t.is(tracker.id, 'TEST_TRACKER');
  t.truthy(tr.t['TEST_TRACKER']);
  tr.remove('TEST_TRACKER');
  t.falsy(tr.t['TEST_TRACKER']);
  t.pass();
});
test('tr object getByName/getAll method', t => {
  const tr = newTr();
  tr.create('TEST_TRACKER0');
  tr.create('TEST_TRACKER1');
  const trackers = tr.getAll();
  t.is(trackers[0].id, 'TEST_TRACKER0');
  t.is(trackers[1].id, 'TEST_TRACKER1');
  let tracker = tr.getByName('TEST_TRACKER1');
  t.is(tracker.id, 'TEST_TRACKER1');
  t.falsy(tr.getByName('TEST_TRACKER2'));
  t.pass();
});
