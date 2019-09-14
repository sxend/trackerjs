import { main } from './main';

const __global: any = (0, eval)('this');

const TRACKERJS_OBJECT = __global.__TRACKERJS_OBJECT || 'tr';

if (__global[TRACKERJS_OBJECT]) {
  main(__global[TRACKERJS_OBJECT]);
}
