import { isString, assign } from './utils/objects';

export class Model {
    constructor(
        private parent?: Model,
        private map: { [name: string]: any } = {}
    ) {}
    static fromFields(fields: { [name: string]: any }): Model {
        return new Model(null, assign({}, fields));
    }
    get(name: string): any {
        const value = this.map[name];
        if (value !== void 0) {
            return value;
        }
        return this.parent && this.parent.get(name);
    }
    set(
        nameOrFieldsObject: string | any,
        value?: any,
        temporary?: boolean
    ): void {
        if (!temporary && this.parent) {
            this.parent.set(nameOrFieldsObject, value, temporary);
        } else {
            if (isString(nameOrFieldsObject)) {
                this.map[nameOrFieldsObject] = value;
            } else {
                for (const name of Object.keys(nameOrFieldsObject)) {
                    this.map[name] = nameOrFieldsObject[name];
                }
            }
        }
    }
}
