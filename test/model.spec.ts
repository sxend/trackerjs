import test from 'ava';
import { Model } from '../src/model';

test('Model class set', t => {
    let model = new Model();
    model.set('key0', 'value0');
    model.set({
        key1: 'value1',
        key2: 'value2',
    });
    t.is(model.get('key0'), 'value0');
    t.is(model.get('key1'), 'value1');
    t.is(model.get('key2'), 'value2');
    t.pass();
});
test('Model class set(temporary)', t => {
    let model = new Model();
    model.set('key0', 'value0', true);
    model.set(
        {
            key1: 'value1',
            key2: 'value2',
        },
        null,
        true
    );
    t.is(model.get('key0'), 'value0');
    t.is(model.get('key1'), 'value1');
    t.is(model.get('key2'), 'value2');
    t.pass();
});
test('Model class set(has parent)', t => {
    let parent = new Model();
    parent.set('key0', 'parent_value0');
    parent.set({
        key1: 'parent_value1',
        key2: 'parent_value2',
    });
    let model = new Model(parent);
    model.set('key0', 'value0');
    model.set({
        key1: 'value1',
        key2: 'value2',
    });
    t.is(parent.get('key0'), 'value0');
    t.is(parent.get('key1'), 'value1');
    t.is(parent.get('key2'), 'value2');
    t.is(model.get('key0'), 'value0');
    t.is(model.get('key1'), 'value1');
    t.is(model.get('key2'), 'value2');
    t.pass();
});
test('Model class set(has parent and temporary)', t => {
    let parent = new Model();
    parent.set('key0', 'parent_value0');
    parent.set({
        key1: 'parent_value1',
        key2: 'parent_value2',
    });
    let model = new Model(parent);
    model.set('key0', 'value0', true);
    model.set(
        {
            key1: 'value1',
            key2: 'value2',
        },
        null,
        true
    );
    t.is(parent.get('key0'), 'parent_value0');
    t.is(parent.get('key1'), 'parent_value1');
    t.is(parent.get('key2'), 'parent_value2');
    t.is(model.get('key0'), 'value0');
    t.is(model.get('key1'), 'value1');
    t.is(model.get('key2'), 'value2');
    t.pass();
});
