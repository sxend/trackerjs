import { Model } from '../model';
import { isFunction } from 'util';
import { Tracker } from '../tracker';
import { customTask } from './custom-task';
import { previewTask } from './preview-task';
import { checkProtocolTask } from './check-protocol-task';
import { validationTask } from './validation-task';
import { checkStorageTask } from './check-storage-task';
import { historyImportTask } from './history-import-task';
import { samplerTask } from './sampler-task';
import { buildHitTask } from './build-hit-task';
import { sendHitTask } from './send-hit-task';
import { timingTask } from './timing-task';
import { displayFeaturesTask } from './display-features-task';

export class Task {
    static TASK_ORDER = [
        'customTask',
        'previewTask',
        'checkProtocolTask',
        'validationTask',
        'checkStorageTask',
        'historyImportTask',
        'samplerTask',
        'buildHitTask',
        'sendHitTask',
        'timingTask',
        'displayFeaturesTask',
    ];
    static setTracker(tracker: Tracker): void {
        tracker.set('customTask', customTask);
        tracker.set('previewTask', previewTask);
        tracker.set('checkProtocolTask', checkProtocolTask);
        tracker.set('validationTask', validationTask);
        tracker.set('checkStorageTask', checkStorageTask);
        tracker.set('historyImportTask', historyImportTask);
        tracker.set('samplerTask', samplerTask);
        tracker.set('buildHitTask', buildHitTask);
        tracker.set('sendHitTask', sendHitTask);
        tracker.set('timingTask', timingTask);
        tracker.set('displayFeaturesTask', displayFeaturesTask);
    }
    constructor(private model: Model) {}
    execute() {
        for (const name of Task.TASK_ORDER) {
            const task = this.model.get(name);
            if (!isFunction(task)) continue;
            task(this.model);
        }
    }
}