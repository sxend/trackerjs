import { Tracker } from './tracker';
import { Fields } from './fields';
import { resolve } from './commands';

export const COMMAND_REGEX = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/;

export class Command {
    private tracker: Tracker;
    private plugin: string;
    private method: string;

    constructor(private tr: any, private args: any[]) {
        const command = COMMAND_REGEX.exec(args.shift());
        const name = command[1] || Fields.defaults().name;
        this.tracker = tr.t[name];
        this.plugin = command[2];
        this.method = command[3];
    }
    run(): void {
        if (!this.plugin) {
            resolve(this.method).apply(this.tr, [this.tracker, ...this.args]);
            return;
        }
        if (!this.tracker) return;
        const plugin = this.tracker.get(`plugin:${this.plugin}`);
        if (plugin) {
            plugin[this.method].apply(plugin, this.args);
        }
    }
}
