import { getGlobal } from '../utils/objects';

const __global = getGlobal();

export function sendByBeacon(
    url: string,
    payload: string,
    callback: Function
): boolean {
    if (!__global.navigator.sendBeacon) return false;
    return __global.navigator.sendBeacon(url, payload)
        ? (callback(), true)
        : false;
}
