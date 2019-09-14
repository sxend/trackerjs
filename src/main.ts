import { create } from './commands/create';
import { remove } from './commands/remove';
import { Tracker } from './tracker';
import { Command } from './command';
export function main(oldtr: any) {
    if (!oldtr.q) {
        // already initialized
        return oldtr;
    }
    function tr(...args: any[]) {
        new Command(tr, args).run();
    }
    initialize(tr);
    return tr;
}

// setup tr object methods.
// https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
function initialize(tr: any) {
    tr.t = {};
    tr.plg = {};
    tr.create = create.bind(tr, null);
    tr.getByName = getByName.bind(tr);
    tr.getAll = getAll.bind(tr);
    tr.remove = removeWraper.bind(tr);
}
function getByName(name: string): Tracker {
    return this.t[name];
}
function getAll(): Array<Tracker> {
    const list = [];
    for (const name of Object.keys(this.t)) {
        list.push(this.t[name]);
    }
    return list;
}
function removeWraper(name: string): void {
    remove.call(this, this.t[name]);
}
