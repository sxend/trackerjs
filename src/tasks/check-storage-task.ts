import { Model } from '../model';
import { Cookies } from '../utils/cookies';

export function checkStorageTask(model: Model): void {
    if (
        model.get('storage') === 'none' ||
        !Cookies.isCookieEnabled(model.get('cookieName'))
    ) {
        throw 'abort task by checkStorageTask';
    }
}
