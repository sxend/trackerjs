import * as Cookies from 'js-cookie';
import { genSimpleId } from './misc';

export function setItem(key: string, value: string, expire: number): void {
    Cookies.set(key, value, {
        expires: new Date(Date.now() + expire * 1000),
    });
}
export function getItem(key: string): string {
    return Cookies.get(key);
}

// https://qiita.com/tatsuyankmura/items/8e09cbd5ee418d35f169
export function isCookieEnabled(prefix: string): boolean {
    const checkString = `${prefix}_${genSimpleId()}`;
    setItem(checkString, checkString, 10);
    const cValue = getItem(checkString);
    return checkString === cValue;
}
