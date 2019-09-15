import { getGlobal } from '../utils/objects';

const __global = getGlobal();
export function sendByXhr(
    url: string,
    payload: string,
    callback: Function
): boolean {
    var XMLHttpRequest = __global.XMLHttpRequest;
    if (!XMLHttpRequest) return false;
    var xhr = new XMLHttpRequest();
    if (!('withCredentials' in xhr)) return false;
    xhr.open('POST');
    url = url.replace(/^http:/, 'https:');
    xhr.open('POST', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onreadystatechange = function() {
        if (4 !== xhr.readyState) return;
        xhr.onreadystatechange = null;
        callback();
    };
    xhr.send(payload);
    return true;
}
