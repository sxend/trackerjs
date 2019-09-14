declare interface Window {
    __TRACKERJS_OBJECT: string
}
const TRACKERJS_OBJECT = window.__TRACKERJS_OBJECT || "tjs";

const tjs: any  = (<any> window)[TRACKERJS_OBJECT] = (<any> window)[TRACKERJS_OBJECT] || {};

tjs.q = tjs.q || [];