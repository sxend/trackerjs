import * as fs from 'fs';
import * as path from 'path';
const hoxy: any = require('hoxy');
import * as getPort from 'get-port';

export function readFileSync(file: string): string {
    return fs.readFileSync(path.join(__dirname, file)).toString();
}
export async function createProxy(): Promise<{ port: number; proxy: any }> {
    const port = await getPort();
    return new Promise(resolve => {
        let proxy = hoxy.createServer().listen(port, () => {
            proxy.context = {};
            interceptAll(proxy);
            resolve({ port, proxy });
        });
    });
}
export function interceptAll(proxy: any): void {
    proxy.intercept(
        {
            phase: 'request',
            fullUrl: /[\s\S]*/,
            as: 'string',
        },
        function(req: any) {
            proxy.context.requests = proxy.context.requests || [];
            proxy.context.requests.push(req);
        }
    );
}
export function interceptE2EHtml(proxy: any, file: string): void {
    proxy.intercept(
        {
            phase: 'request',
            fullUrl: 'http://example.com/e2e.html',
            as: 'string',
        },
        function(req: any, res: any) {
            proxy.context;
            res.string = readFileSync(file);
        }
    );
}
export function interceptTrackerJS(proxy: any): void {
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
}
