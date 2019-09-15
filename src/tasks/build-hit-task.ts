import { Model } from '../model';

export function buildHitTask(model: Model) {
    const hitPayload = ''; // TODO impl build payload
    model.set('hitPayload', hitPayload, true);
}
