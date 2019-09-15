import * as CookiesUtil from 'js-cookie';
import { genSimpleId } from './misc';

export namespace Cookies {
    export function setItem(
        key: string,
        value: string,
        domain?: string,
        expire?: number
    ): void {
        CookiesUtil.set(key, value, {
            domain,
            expires: new Date(Date.now() + expire * 1000),
        });
    }
    export function getItem(key: string): string {
        return CookiesUtil.get(key);
    }
    // https://qiita.com/tatsuyankmura/items/8e09cbd5ee418d35f169
    export function isCookieEnabled(prefix: string): boolean {
        const checkString = `${prefix}_${genSimpleId()}`;
        setItem(checkString, checkString, void 0, 10);
        const cValue = getItem(checkString);
        return checkString === cValue;
    }
}
