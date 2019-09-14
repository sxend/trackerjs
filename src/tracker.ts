import { Model } from './model';

export class Tracker {
    private model: Model;
    constructor(public id: string) {
        this.model = new Model();
    }
    static create(id: string, options: any): Tracker {
        return new Tracker(id);
    }
}
