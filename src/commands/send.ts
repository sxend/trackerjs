import { Tracker } from '../tracker';

export function send(tracker: Tracker, hitType: string, ...args: any[]) {
    tracker.send(hitType, ...args);
}
