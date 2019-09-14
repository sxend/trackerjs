import { isDebugEnabled } from './misc';

export namespace Log {
    export function log(...args: any[]): void {
        isDebugEnabled ? void 0 : console.log(...args);
    }
}
