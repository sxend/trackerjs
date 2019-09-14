import { Model } from '../model';
import { getGlobal } from '../utils/objects';

const __global = getGlobal();

export function previewTask(model: Model): void {
    if (
        __global.navigator &&
        __global.navigator.loadPurpose &&
        __global.navigator.loadPurpose === 'preview'
    ) {
        throw 'abort task by previewTask';
    }
}
