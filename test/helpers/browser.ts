import * as puppeteer from 'puppeteer';

export async function launchBrowser(
    port: number,
    options?: any
): Promise<puppeteer.Browser> {
    return puppeteer.launch(
        Object.assign(
            {
                ignoreHTTPSErrors: true,
                args: [`--proxy-server=127.0.0.1:${port}`],
            },
            options
        )
    );
}
