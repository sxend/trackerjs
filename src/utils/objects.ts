export function isObject(obj: any): boolean {
    return typeIs(obj, 'object');
}
export function isString(obj: any): boolean {
    return typeIs(obj, 'string');
}
export function isNumber(obj: any): boolean {
    return typeIs(obj, 'number');
}
export function isFunction(obj: any): boolean {
    return typeIs(obj, 'function');
}
function typeIs(obj: any, t: string): boolean {
    return typeof obj === t;
}
export function getGlobal(): any {
    return (0, eval)('this');
}
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
export function assign(target: any, ..._: any) {
    if (!target) return {};
    const to = Object(target);
    for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index];
        if (!nextSource) continue;
        for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
            }
        }
    }
    return to;
}
