const ArrayProto = Array.prototype;
export function slice(arrayLike: any): Array<any> {
    return ArrayProto.slice.call(arrayLike);
}
