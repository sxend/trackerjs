import { getGlobal } from '../utils/objects';

const __global = getGlobal();

export function sendByImage(url: string, payload: string, callback: Function) {
    const img = __global.document.createElement('img');
    img.width = 1;
    img.height = 1;
    img.onload = img.onerror = function() {
        img.onload = null;
        img.onerror = null;
        callback();
    };
    img.src = `${url}?${payload}`;
}
