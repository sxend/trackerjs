import { isDebugEnabled } from './misc';

export namespace Logger {
    export function log(...args: any[]): void {
        isDebugEnabled ? void 0 : console.log(...args);
    }
}
