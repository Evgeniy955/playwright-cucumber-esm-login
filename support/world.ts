import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';
import {LoginPage} from "../tests/features/pages/LoginPage.ts";
import 'dotenv/config';

type SupportedBrowsers = 'chromium' | 'firefox' | 'webkit';

export interface CustomWorld extends World {
    browser: Browser;
    context: BrowserContext;
    page: Page;
    loginPage: LoginPage;
    init(browserName: SupportedBrowsers): Promise<void>;
}

export class PlaywrightWorld extends World implements CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init(browserName: SupportedBrowsers = 'chromium') {
        const isHeadless = process.env.HEADLESS !== 'false';
        const name = (process.env.BROWSER || browserName) as SupportedBrowsers;

        const browserType = { chromium, firefox, webkit }[name];

        if (!browserType) {
            throw new Error(`Unsupported browser: ${browserName}`);
        }

        this.browser = await browserType.launch({
            headless: isHeadless,
        });

        this.context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
        });
        this.page = await this.context.newPage();
    }
}

setWorldConstructor(PlaywrightWorld);
