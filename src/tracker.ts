import { Model } from './model';
import { isString, assign, isNumber } from './utils/objects';
import { Task, setDefaultTasks } from './tasks';
import { isObject } from 'util';
import { Fields } from './fields';

export class Tracker {
    private model: Model;
    constructor() {
        this.model = new Model();
    }
    static create(fields: any): Tracker {
        const tracker = new Tracker();
        tracker.set(assign(Fields.defaults(), fields));
        setDefaultTasks(tracker);
        return tracker;
    }
    get(name: string): any {
        return this.model.get(name);
    }
    set(nameOrFieldsObject: string | any, value?: any): void {
        this.model.set(nameOrFieldsObject, value);
    }
    send(hitType: string, ...args: any[]): void {
        const fields = resolveStorategy(hitType).collect(args);
        const hitModel = new Model(this.model);
        hitModel.set(fields, null, true);
        new Task(hitModel).execute();
    }
}

interface FieldStorategy {
    collect(args: any[]): any;
}
function resolveStorategy(hitType: string): FieldStorategy {
    switch (hitType) {
        case 'pageview':
            return new PageviewStorategy();
        case 'event':
            return new Eventtorategy();
        case 'social':
            return new SocialStorategy();
        case 'timing':
            return new TimingStorategy();
        default:
            return new DefaultStorategy();
    }
}

class PageviewStorategy implements FieldStorategy {
    collect(args: any[]): any {
        let fields: any = {};
        fields = setFieldOrAssignObject(fields, args[0], isString, 'page');
        return fields;
    }
}
class Eventtorategy implements FieldStorategy {
    collect(args: any[]): any {
        let fields: any = {};
        fields = setFieldOrAssignObject(
            fields,
            args[0],
            isString,
            'eventCategory'
        );
        fields = setFieldOrAssignObject(
            fields,
            args[1],
            isString,
            'eventAction'
        );
        fields = setFieldOrAssignObject(
            fields,
            args[2],
            isString,
            'eventLabel'
        );
        fields = setFieldOrAssignObject(
            fields,
            args[3],
            isNumber,
            'eventValue'
        );
        if (isObject(args[4])) {
            fields = assign(fields, args[4]);
        }
        return fields;
    }
}
class SocialStorategy implements FieldStorategy {
    collect(args: any[]): any {
        let fields: any = {};
        fields = setFieldOrAssignObject(
            fields,
            args[0],
            isString,
            'socialNetwork'
        );
        fields = setFieldOrAssignObject(
            fields,
            args[1],
            isString,
            'socialAction'
        );
        fields = setFieldOrAssignObject(
            fields,
            args[2],
            isString,
            'socialTarget'
        );
        if (isObject(args[3])) {
            fields = assign(fields, args[3]);
        }
        return fields;
    }
}
class TimingStorategy implements FieldStorategy {
    collect(args: any[]): any {
        let fields: any = {};
        fields = setFieldOrAssignObject(
            fields,
            args[0],
            isString,
            'timingCategory'
        );
        fields = setFieldOrAssignObject(fields, args[1], isString, 'timingVar');
        fields = setFieldOrAssignObject(
            fields,
            args[2],
            isNumber,
            'timingValue'
        );
        fields = setFieldOrAssignObject(
            fields,
            args[3],
            isString,
            'timingLabel'
        );
        if (isObject(args[4])) {
            fields = assign(fields, args[4]);
        }
        return fields;
    }
}
class DefaultStorategy implements FieldStorategy {
    collect(args: any[]): any {
        let fields: any = {};
        return isObject(args[0]) ? assign(fields, ...args) : fields;
    }
}
function setFieldOrAssignObject(
    fields: any,
    obj: any,
    predicate: (obj: any) => boolean,
    name: string
): any {
    if (predicate(obj)) {
        fields = assign(fields, {
            [name]: obj,
        });
    } else if (isObject(obj)) {
        fields = assign(fields, obj);
    }
    return fields;
}
