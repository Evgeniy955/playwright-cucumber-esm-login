import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import {LoginPage} from "../tests/features/pages/LoginPage.ts";

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

setDefaultTimeout(60 * 1000);

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    this.page = page; // Share page instance across steps
    this.loginPage = loginPage; // Share loginPage instance
});

After(async function () {
    await browser.close();
});
