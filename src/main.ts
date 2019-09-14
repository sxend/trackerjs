import { create } from './commands/create';
import { Tracker } from './tracker';
import { tr } from './tr';

export function main(tr: any) {
  initialize(tr);
  while (tr.q.length > 0) {
    console.log(tr.q.pop());
  }
}

// setup tr object methods.
// https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
function initialize(tr: any) {
  tr.t = {};
  tr.create = function create(id: string, ...options: any): Tracker {
    return (tr.t[id] = Tracker.create(id, options));
  };
  tr.getByName = function getByName(name: string): Tracker {
    return tr.t[name];
  };
  tr.getAll = function getAll(): Array<Tracker> {
    const list = [];
    for (const name of Object.keys(tr.t)) {
      list.push(tr.t[name]);
    }
    return list;
  };
  tr.remove = function remove(name: string): void {
    delete tr.t[name];
  };
}
