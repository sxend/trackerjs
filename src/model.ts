import { Fields } from './fields';

export class Model {
    private map: Map<string, any>;
    constructor(private parent?: Model) {
        this.map = new Map();
        if (!parent) {
            this.set(Fields.defaults());
        }
    }
    get(name: string): any {
        const value = this.map.get(name);
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
            if (typeof nameOrFieldsObject === 'string') {
                this.map.set(nameOrFieldsObject, value);
            } else {
                for (const name of Object.keys(nameOrFieldsObject)) {
                    this.map.set(name, nameOrFieldsObject[name]);
                }
            }
        }
    }
}
