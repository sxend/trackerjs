import { Tracker } from '../tracker';

export function set(
    tracker: Tracker,
    nameOrFieldsObject: string | any,
    value?: any
) {
    tracker.set(nameOrFieldsObject, value);
}
