import test from 'ava';

import {
    interceptE2EHtml,
    interceptTrackerJS,
    createProxy,
} from '../helpers/proxy';
import { launchBrowser } from '../helpers/browser';

test('send pageview', async t => {
    const { port, proxy } = await createProxy();
    interceptTrackerJS(proxy);
    interceptE2EHtml(proxy, 'html/pageview.html');
    const browser = await launchBrowser(port);
    const page = await browser.newPage();
    await page.goto('http://example.com/e2e.html');
    await page.waitFor(1000);
    const result = await page.evaluate(() => (0, eval)('this')['tr']);
    await browser.close();
    t.falsy(result.q);
    t.truthy(result.create);
    t.truthy(proxy.context.requests);
    t.is(
        proxy.context.requests.filter(
            (req: any) => req.url.indexOf('collect') !== -1
        ).length,
        1
    );
    t.pass();
});
