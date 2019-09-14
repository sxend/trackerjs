import { Tracker } from '../tracker';
import { isFunction } from '../utils/objects';

export function _require(
    tracker: Tracker,
    pluginName: string,
    pluginOption?: any
) {
    const tr = this;
    if (!isFunction(tr.plg[pluginName])) return;
    this.tracker.set(
        `plugin:${pluginName}`,
        new tr.plg[pluginName](tracker, pluginOption)
    );
    this.tracker.set(`plugin:${pluginName}:option`, pluginOption);
}
