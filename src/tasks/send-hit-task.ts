import { Model } from '../model';
import { sendByImage } from '../transports/image-transport';
import { sendByXhr } from '../transports/xhr-transport';
import { sendByBeacon } from '../transports/beacon-transport';

export function sendHitTask(model: Model) {
    let transport = model.get('transport');
    const endpoint = model.get('endpoint');
    const payload = model.get('hitPayload');
    const hitCallback = model.get('hitCallback') || (() => {});
    if (!transport) {
        if (model.get('useBeacon')) {
            transport = 'beacon';
        }
    }
    switch (transport) {
        case 'img':
            return sendByImage(endpoint, payload, hitCallback);
        case 'xhr':
            return sendByXhr(endpoint, payload, hitCallback);
        case 'beacon':
            return sendByBeacon(endpoint, payload, hitCallback);
        default:
            return sendPayloadWithFallback(endpoint, payload, hitCallback);
    }
}
function sendPayloadWithFallback(
    endpoint: string,
    payload: string,
    callback: Function
): void {
    if (payload.length <= 2036) {
        sendByImage(endpoint, payload, callback);
    } else if (payload.length <= 8192) {
        sendByBeacon(endpoint, payload, callback) ||
            sendByXhr(endpoint, payload, callback) ||
            sendByImage(endpoint, payload, callback);
    } else {
        throw 'payload size error: ' + payload.length;
    }
}
