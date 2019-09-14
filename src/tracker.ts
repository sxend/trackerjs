import { Model } from './model';

export class Tracker {
    private model: Model;
    constructor(fields: any) {
        this.model = new Model();
        this.model.set(fields);
    }
    static create(fields: any): Tracker {
        return new Tracker(fields);
    }
    get(name: string): any {
        return this.model.get(name);
    }
    set(nameOrFieldsObject: string | any, value?: any): void {
        this.model.set(nameOrFieldsObject, value);
    }
    send(hitType: string): void {}
}
