import { main } from './main';

const __global: any = (0, eval)('this');

const TRACKERJS_OBJECT = __global.__TRACKERJS_OBJECT || 'tr';

if (__global[TRACKERJS_OBJECT]) {
    const oldtr = __global[TRACKERJS_OBJECT];
    __global[TRACKERJS_OBJECT] = main(oldtr);
    try {
        while (oldtr.q && oldtr.q.length > 0) {
            __global[TRACKERJS_OBJECT](...oldtr.q.shift());
        }
    } catch (e) {}
}
