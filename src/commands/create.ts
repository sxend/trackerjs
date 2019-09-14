import { Tracker } from '../tracker';
import { Arrays, Objects } from '../util';

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
    if (typeof args[0] === 'string') {
        fields['trackingId'] = args[0];
    } else if (typeof args[0] === 'object') {
        fields = Objects.assign(fields, args[0]);
    }
    if (typeof args[1] === 'string') {
        fields['cookieDomain'] = args[1];
    } else if (typeof args[1] === 'object') {
        fields = Objects.assign(fields, args[1]);
    }
    if (typeof args[2] === 'string') {
        fields['name'] = args[2];
    } else if (typeof args[2] === 'object') {
        fields = Objects.assign(fields, args[2]);
    }
    return fields;
}
