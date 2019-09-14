import { getGlobal } from './objects';

export function genSimpleId(): string {
    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2)
    );
}

const __global = getGlobal();
export const isDebugEnabled: boolean =
    __global.location &&
    __global.location.hash &&
    __global.location.hash.indexOf('__tr_debug_enabled');
