import { isDebugEnabled } from './misc';

export namespace Logger {
    export function log(...args: any[]): void {
        isDebugEnabled ? console.log(...args) : void 0;
    }
}
