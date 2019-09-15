import test from 'ava';
import * as puppeteer from 'puppeteer';
const hoxy: any = require('hoxy');
import * as getPort from 'get-port';
import { readFileSync } from '../helpers/proxy';

test('send pageview', async t => {
    const port = await getPort();
    const proxy: any = await new Promise(resolve => {
        let server = hoxy.createServer().listen(port, () => {
            t.log('proxy listen');
            resolve(server);
        });
    });
    proxy.intercept(
        {
            phase: 'request',
            fullUrl: 'http://example.com/pageview.html',
            as: 'string',
        },
        function(req: any, res: any) {
            res.string = readFileSync('html/pageview.html');
        }
    );
    proxy.intercept(
        {
            phase: 'request',
            fullUrl: 'http://example.com/tracker.js',
            as: 'string',
        },
        function(req: any, res: any) {
            res.string = readFileSync('../../target/tracker.js');
        }
    );
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        args: [`--proxy-server=127.0.0.1:${port}`],
    });
    const page = await browser.newPage();
    await page.goto('http://example.com/pageview.html');
    await page.waitFor(1000);
    const result = await page.evaluate(() => (0, eval)('this')['tr']);
    await browser.close();
    t.falsy(result.q);
    t.truthy(result.create);
    t.pass();
});
