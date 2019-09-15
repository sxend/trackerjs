import { Model } from './model';
import { isString, assign, isNumber } from './utils/objects';
import { Task, setDefaultTasks } from './tasks';
import { isObject } from 'util';
import { Fields } from './fields';
import { Cookies } from './utils/cookies';
import { getHostname } from './utils/misc';

export class Tracker {
    constructor(private model: Model) {}
    static create(fields: { [name: string]: any }): Tracker {
        const model = Model.fromFields(assign(Fields.defaults(), fields));
        assignClientId(model);
        const tracker = new Tracker(model);
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
        const fields = resolveFieldStrategy(hitType).collect(args);
        const hitModel = new Model(this.model);
        hitModel.set(fields, null, true);
        new Task(hitModel).execute();
    }
}
function assignClientId(model: Model): void {
    const storage = model.get('storage');
    if (storage !== 'cookie' || storage === 'none') return;
    const cookieName = model.get('cookieName');
    const clientId = Cookies.getItem(cookieName);
    if (clientId) {
        model.set('clientId', clientId);
    } else {
        setClientId(
            cookieName,
            model.get('clientId'),
            model.get('cookieDomain'),
            model.get('cookieExpires')
        );
    }
}
function setClientId(
    cookieName: string,
    clientId: string,
    cookieDomain: string,
    cookieExpires: number
) {
    function trySetItem(): boolean {
        Cookies.setItem(cookieName, clientId, cookieDomain, cookieExpires);
        return isString(Cookies.getItem(cookieName));
    }
    if (cookieDomain === 'none') {
        cookieDomain = void 0;
    }
    if (cookieDomain === 'auto') {
        const hostnameElem = getHostname().split('.');
        cookieDomain = hostnameElem.pop();
        const prependDomain = () => {
            cookieDomain = hostnameElem.pop() + '.' + cookieDomain;
        };
        let result: boolean;
        do {
            prependDomain();
            result = trySetItem();
        } while (!result && hostnameElem.length !== 0);
    } else {
        trySetItem();
    }
}
interface FieldStrategy {
    collect(args: any[]): any;
}
function resolveFieldStrategy(hitType: string): FieldStrategy {
    switch (hitType) {
        case 'pageview':
            return new PageviewStrategy();
        case 'event':
            return new EventStrategy();
        case 'social':
            return new SocialStrategy();
        case 'timing':
            return new TimingStrategy();
        default:
            return new DefaultStrategy();
    }
}

class PageviewStrategy implements FieldStrategy {
    collect(args: any[]): any {
        let fields: any = {};
        fields = setFieldOrAssignObject(fields, args[0], isString, 'page');
        return fields;
    }
}
class EventStrategy implements FieldStrategy {
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
class SocialStrategy implements FieldStrategy {
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
class TimingStrategy implements FieldStrategy {
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
class DefaultStrategy implements FieldStrategy {
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
