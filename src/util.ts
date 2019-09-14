export namespace Arrays {
    const ArrayProto = Array.prototype;
    export function slice(arrayLike: any): Array<any> {
        return ArrayProto.slice.call(arrayLike);
    }
}

export namespace Objects {
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
                    if (
                        Object.prototype.hasOwnProperty.call(
                            nextSource,
                            nextKey
                        )
                    ) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    }
}
