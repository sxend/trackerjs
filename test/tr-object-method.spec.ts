import test from 'ava';
import { newtr } from './helpers/tr-snipet';
import { main } from '../src/main';

function newTr() {
    const tr = newtr();
    return main(tr);
}
test('tr object create/remove method', t => {
    const tr = newTr();
    const tracker = tr.create('TEST_TRACKER');
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
    t.is(trackers.length, 1);
    t.is(trackers[0].get('trackingId'), 'TEST_TRACKER0');
    let tracker = tr.getByName('t0');
    t.is(tracker.get('trackingId'), 'TEST_TRACKER0');
    t.falsy(tr.getByName('TEST_TRACKER2'));
    t.pass();
});
test('tr object create/remove method(explicitly tracker name)', t => {
    let tr = newTr();
    let tracker = tr.create('TEST_TRACKER', {
        name: 'tname',
    });
    t.is(tracker.get('trackingId'), 'TEST_TRACKER');
    t.is(tracker.get('name'), 'tname');
    t.truthy(tr.t['tname']);
    tr.remove('tname');
    t.falsy(tr.t['tname']);
    tr = newTr();
    tracker = tr.create('TEST_TRACKER', 'endpoint', 'cdomain', 'tname2');
    t.is(tracker.get('trackingId'), 'TEST_TRACKER');
    t.is(tracker.get('name'), 'tname2');
    t.truthy(tr.t['tname2']);
    tr.remove('tname2');
    t.falsy(tr.t['tname2']);
    t.pass();
});
test('tr object getByName/getAll method(explicitly tracker name)', t => {
    let tr = newTr();
    tr.create('TEST_TRACKER0', 'endpoint', 'cdomain', 'tname0');
    tr.create('TEST_TRACKER1', 'endpoint', 'cdomain', 'tname1');
    let trackers = tr.getAll();
    t.is(trackers.length, 2);
    t.is(trackers[0].get('trackingId'), 'TEST_TRACKER0');
    t.is(trackers[0].get('name'), 'tname0');
    let tracker = tr.getByName('tname0');
    t.is(tracker.get('trackingId'), 'TEST_TRACKER0');
    t.falsy(tr.getByName('TEST_TRACKER2'));
    t.pass();
});
