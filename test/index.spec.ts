import test from 'ava';
import { tr } from '../src/tr';

test('index', t => {
  tr('create', 'TEST_TRACKER');
  tr('send', 'pageview');
  t.deepEqual(tr.q, [['create', 'TEST_TRACKER'], ['send', 'pageview']]);
  t.pass();
});
