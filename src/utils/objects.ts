export function isObject(obj: any): boolean {
    return typeIs(obj, 'object');
}
export function isString(obj: any): boolean {
    return typeIs(obj, 'string');
}
export function isNumber(obj: any): boolean {
    return typeIs(obj, 'number');
}
function typeIs(obj: any, t: string): boolean {
    return typeof obj === t;
}
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
export function assign(target: any, ..._: any) {
    'use strict';
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}
