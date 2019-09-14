import { Tracker } from '../tracker';

export function set(
    tracker: Tracker,
    nameOrFieldsObject: string | any,
    value?: any
) {
    const tr = this;
    tracker.set(nameOrFieldsObject, value);
}
