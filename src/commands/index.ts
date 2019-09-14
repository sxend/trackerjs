import { create } from './create';
import { provide } from './provide';
import { remove } from './remove';
import { _require } from './require';
import { send } from './send';
import { set } from './set';

export function resolve(method: string): Function {
    switch (method) {
        case 'create':
            return create;
        case 'provide':
            return provide;
        case 'remove':
            return remove;
        case 'require':
            return _require;
        case 'send':
            return send;
        case 'set':
            return set;
        default:
            return () => {};
    }
}
