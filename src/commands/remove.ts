import { Tracker } from '../tracker';

export function remove(tracker: Tracker) {
    const tr = this;
    delete tr.t[tracker.get('name')];
}
