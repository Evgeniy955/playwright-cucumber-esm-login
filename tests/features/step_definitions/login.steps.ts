import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage.js';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

setDefaultTimeout(60 * 1000);

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
});

After(async function () {
  await browser.close();
});

Given('I open the login page', async function () {
  await loginPage.open();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.submitLogin();
});

Then('Choose {string} package', async function (typePackage: string) {
  await loginPage.choosePackage(typePackage);
});
