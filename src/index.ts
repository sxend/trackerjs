const __global: any = (0, eval)('this');

const TRACKERJS_OBJECT = __global.__TRACKERJS_OBJECT || 'tr';
const TRACKERJS_CALLBACK = __global.__TRACKERJS_CALLBACK || '__tr_callback';
export var tr: any = (__global[TRACKERJS_OBJECT] =
  __global[TRACKERJS_OBJECT] ||
  function _tr() {
    const command = [].slice.call(arguments);
    tr.q.push(command);
  });

tr.q = tr.q || [];

if (typeof __global[TRACKERJS_CALLBACK] === 'function') {
  __global[TRACKERJS_CALLBACK](tr);
}
