import test from 'ava';
import { newtr } from '../src/tr';
import { main } from '../src/main';
import { convertArguments, create } from '../src/commands/create';

function newTr() {
    const tr = newtr();
    main(tr);
    return tr;
}
test('tr object create/remove method', t => {
    const tr = newTr();
    const tracker = tr.create('TEST_TRACKER');
    t.log(tracker);
    t.is(tracker.get('trackingId'), 'TEST_TRACKER');
    t.truthy(tr.t['t0']);
    tr.remove('t0');
    t.falsy(tr.t['t0']);
    t.pass();
});
test('tr object getByName/getAll method', t => {
    const tr = newTr();
    tr.create('TEST_TRACKER0');
    tr.create('TEST_TRACKER1');
    const trackers = tr.getAll();
    t.log(trackers);
    t.is(trackers.length, 1);
    t.is(trackers[0].get('trackingId'), 'TEST_TRACKER0');
    let tracker = tr.getByName('t0');
    t.is(tracker.get('trackingId'), 'TEST_TRACKER0');
    t.falsy(tr.getByName('TEST_TRACKER2'));
    t.pass();
});
