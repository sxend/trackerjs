import { Model } from './model';
const __global = (0, eval)('this');

export namespace Fields {
    export function defaults(): any {
        return {
            name: 't0',
            clientId: 'Randomly Generated', // TODO gen uuid
            sampleRate: 100,
            siteSpeedSampleRate: 1,
            alwaysSendReferrer: false,
            allowAnchor: true,
            cookieName: '_tr',
            cookieDomain:
                __global.document && __global.document.location.hostname,
            cookieExpires: 63072000,
            storeGac: true,
            legacyHistoryImport: true,
            allowLinker: false,
            allowAdFeatures: true,
            // anonymizeIp: 'aip',
            // dataSource: 'ds',
            // queueTime: 'qt',
            forceSSL: false,
            transport: 'none', // 「beacon」、「xhr」、「image」
            useBeacon: false,
            // userId: 'uid',
            // sessionControl: 'sc',
            referrer: __global.document && __global.document.referrer,
            // campaignName: 'cn',
            // campaignSource: 'cs',
            // campaignMedium: 'cm',
            // campaignKeyword: 'ck',
            // campaignContent: 'cc',
            // campaignId: 'ci',
            // screenResolution: 'sr',
            // viewportSize: 'vp',
            encoding: 'UTF-8',
            // screenColors: 'sd',
            // language: 'ul',
            // javaEnabled: 'je',
            // flashVersion: 'fl',
            // hitType: 't',
            // nonInteraction: 'ni',
            // location: 'dl',
            // hostname: 'dh',
            // page: 'dp',
            // title: 'dt',
            // screenName: 'cd',
            // contentGroup: 'cg<groupIndex>',
            // linkid: 'linkid',
            // appName: 'an',
            // appId: 'aid',
            // appVersion: 'av',
            // appInstallerId: 'aiid',
            // eventCategory: 'ec',
            // eventAction: 'ea',
            // eventLabel: 'el',
            // eventValue: 'ev',
            // '(product) id': 'pr<productIndex>id',
            // '(product) name': 'pr<productIndex>nm',
            // '(product) brand': 'pr<productIndex>br',
            // '(product) category': 'pr<productIndex>ca',
            // '(product) variant': 'pr<productIndex>va',
            // '(product) price': 'pr<productIndex>pr',
            // '(product) quantity': 'pr<productIndex>qt',
            // '(product) coupon': 'pr<productIndex>cc',
            // '(product) position': 'pr<productIndex>ps',
            // '(product) dimension': 'pr<productIndex>cd<dimensionIndex>',
            // '(product) metric': 'pr<productIndex>cm<metricIndex>',
            // '(product action)': 'pa',
            // '(product action) id': 'ti',
            // '(product action) affiliation': 'ta',
            // '(product action) revenue': 'tr',
            // '(product action) tax': 'tt',
            // '(product action) shipping': 'ts',
            // '(product action) coupon': 'tcc',
            // '(product action) list': 'pal',
            // '(product action) step': 'cos',
            // '(product action) option': 'col',
            // '(impression) list': 'il<listIndex>nm',
            // '(impression) id': 'il<listIndex>pi<productIndex>id',
            // '(impression) name': 'il<listIndex>pi<productIndex>nm',
            // '(impression) brand': 'il<listIndex>pi<productIndex>br',
            // '(impression) category': 'il<listIndex>pi<productIndex>ca',
            // '(impression) variant': 'il<listIndex>pi<productIndex>va',
            // '(impression) position': 'il<listIndex>pi<productIndex>ps',
            // '(impression) price': 'il<listIndex>pi<productIndex>pr',
            // '(impression) dimension':
            //     'il<listIndex>pi<productIndex>cd<dimensionIndex>',
            // '(impression) metric':
            //     'il<listIndex>pi<productIndex>cm<metricIndex>',
            // '(promo) id': 'promo<promoIndex>id',
            // '(promo) name': 'promo<promoIndex>nm',
            // '(promo) creative': 'promo<promoIndex>cr',
            // '(promo) position': 'promo<promoIndex>ps',
            // '(promo) action': 'promoa',
            // currencyCode: 'cu',
            // socialNetwork: 'sn',
            // socialAction: 'sa',
            // socialTarget: 'st',
            // timingCategory: 'utc',
            // timingVar: 'utv',
            // timingValue: 'utt',
            // timingLabel: 'utl',
            // exDescription: 'exd',
            exFatal: 1,
            // dimension: 'cd<dimensionIndex>',
            // metric: 'cm<metricIndex>',
            // expId: 'xid',
            // expVar: 'xvar',
        };
    }
    export function toProtocolParam(name: string, model: Model): string {
        return protocolParams[name];
    }
    const protocolParams: { [name: string]: string } = {};
}