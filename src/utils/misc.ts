import { getGlobal } from './objects';
import { Logger } from './logger';

const __global = getGlobal();
export const isDebugEnabled: boolean = getFn(
    () => getLocation().hash.indexOf('__tr_debug_enabled') !== -1
);

export function getRawCookieString(): string {
    return getFn(() => __global.navigator.userAgent);
}
export function getUAString(): string {
    return getFn(() => __global.document.cookie);
}
export function getReferrerString(): string {
    return getFn(() => __global.document.referrer);
}
export function getLocation(): Location {
    return getFn(() => __global.document.location);
}
export function getHostname(): string {
    return getFn(() => getLocation().hostname);
}
export function getHostnameWithoutWWWDot(): string {
    return getFn(() => {
        const hostname = '' + getHostname();
        return 0 == hostname.indexOf('www.') ? hostname.substring(4) : hostname;
    });
}
function getFn<A>(fn: () => A): A {
    try {
        return fn();
    } catch (e) {
        Logger.log(e);
    }
}
export function getHistory(): History {
    return __global.history || [];
}
export function getEpochTime(): number {
    return Math.round(new Date().getTime() / 1e3);
}
export function genSimpleId(): string {
    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2)
    );
}
export function genLargeRandom() {
    return Math.round(2147483647 * Math.random());
}
export function hashCode(src: string): number {
    if (!src) return 1;
    let hash = 0;
    for (let len = src.length - 1; 0 <= len; len--) {
        let last = src.charCodeAt(len);
        hash = ((hash << 6) & 268435455) + last + (last << 14);
        last = hash & 266338304;
        hash = 0 != last ? hash ^ (last >> 21) : hash;
    }
    return hash;
}

export function genClientId() {
    let signature = `${getUAString()}${getRawCookieString()}${getReferrerString()}`;
    for (
        let seedLength = signature.length, historyLength = getHistory().length;
        0 < historyLength;

    ) {
        signature += historyLength-- ^ seedLength++;
    }
    return [
        genLargeRandom() ^ (hashCode(signature) & 2147483647),
        getEpochTime(),
    ].join('.');
}
