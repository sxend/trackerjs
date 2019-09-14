import { Tracker } from '../tracker';

export function _require(
    tracker: Tracker,
    pluginName: string,
    pluginOption?: any
) {
    const tr = this;
    if (!tr.plg[pluginName] || typeof tr.plg[pluginName] !== 'function') return;
    this.tracker.set(
        `plugin:${pluginName}`,
        new tr.plg[pluginName](tracker, pluginOption)
    );
    this.tracker.set(`plugin:${pluginName}:option`, pluginOption);
}
