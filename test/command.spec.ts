import test from 'ava';
import { COMMAND_REGEX } from '../src/command';
test('command regex(capture method name only)', t => {
    const matched = COMMAND_REGEX.exec('method');
    t.is(matched[1], undefined);
    t.is(matched[2], undefined);
    t.is(matched[3], 'method');
    t.pass();
});
test('command regex(capture method name and tracker)', t => {
    const matched = COMMAND_REGEX.exec('tracker.method');
    t.is(matched[1], 'tracker');
    t.is(matched[2], undefined);
    t.is(matched[3], 'method');
    t.pass();
});
test('command regex(capture method name and plugin)', t => {
    const matched = COMMAND_REGEX.exec('plugin:method');
    t.is(matched[1], undefined);
    t.is(matched[2], 'plugin');
    t.is(matched[3], 'method');
    t.pass();
});
test('command regex(capture method name and tracker and plugin)', t => {
    const matched = COMMAND_REGEX.exec('tracker.plugin:method');
    t.is(matched[1], 'tracker');
    t.is(matched[2], 'plugin');
    t.is(matched[3], 'method');
    t.pass();
});
