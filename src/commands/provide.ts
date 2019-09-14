import { Tracker } from '../tracker';

export function provide(
    _: Tracker,
    pluginName: string,
    pluginConstuctor: Function
) {
    const tr = this;
    tr.plg[pluginName] = pluginConstuctor;
}
