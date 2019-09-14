import { Model } from '../model';
import { isCookieEnabled } from '../utils/cookies';

export function checkStorageTask(model: Model): void {
    if (!isCookieEnabled(model.get('cookieName'))) {
        throw 'abort task by checkStorageTask';
    }
}
