export function ifExixtsFn<A, B>(x: A, fn: (x: A) => B): B {
    return x && fn(x);
}
