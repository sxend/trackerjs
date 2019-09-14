import { Tracker } from '../tracker';
import { assign, isString, isObject } from '../utils/objects';

export function create(_: Tracker, ...args: any[]): Tracker {
    const tr = this;
    const fields = convertArguments(args);
    const tracker = Tracker.create(fields);
    if (!tr.t[tracker.get('name')]) {
        tr.t[tracker.get('name')] = tracker;
    }
    return tracker;
}
function convertArguments(args: any[]): any {
    let fields: any = {};
    if (isString(args[0])) {
        fields['trackingId'] = args[0];
    } else if (isObject(args[0])) {
        fields = assign(fields, args[0]);
    }
    if (isString(args[1])) {
        fields['endpoint'] = args[1];
    } else if (isObject(args[1])) {
        fields = assign(fields, args[1]);
    }
    if (isString(args[2])) {
        fields['cookieDomain'] = args[2];
    } else if (isObject(args[2])) {
        fields = assign(fields, args[2]);
    }
    if (isString(args[3])) {
        fields['name'] = args[3];
    } else if (isObject(args[3])) {
        fields = assign(fields, args[3]);
    }
    if (isObject(args[4])) {
        fields = assign(fields, args[4]);
    }
    return fields;
}
