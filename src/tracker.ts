import { Model } from './model';

export class Tracker {
    private model: Model;
    constructor(public id: string) {
        this.model = new Model();
    }
    static create(id: string, options: any): Tracker {
        return new Tracker(id);
    }
    get(name: string): any {
        return this.model.get(name);
    }
    set(nameOrFieldsObject: string, value: any): void {
        this.model.set(nameOrFieldsObject, value);
    }
    send(hitType: string): void {}
}
