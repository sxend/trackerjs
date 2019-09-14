import { Model } from '../model';
import { getGlobal } from '../utils/objects';

const __global = getGlobal();

export function checkProtocolTask(model: Model): void {
    const protocol = __global.location && __global.location.protocol;
    if (protocol !== 'http:' && protocol !== 'https:') {
        throw 'abort task by checkProtocolTask';
    }
}
