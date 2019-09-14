import { argumentsParser } from '../arguments-parser';
import { Tracker } from '../tracker';

export function create(id: string): Tracker {
    const args = argumentsParser(arguments);
    return Tracker.create(id, args);
}
