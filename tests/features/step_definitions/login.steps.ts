import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import '../../../support/hooks.ts';

setDefaultTimeout(60 * 1000);

Given('I open the login page', async function () {
  // Accessing the shared instance of LoginPage from hooks via `this`
  await this.loginPage.open();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  // Using the shared LoginPage instance to interact with the login page
  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
  await this.loginPage.submitLogin();
});

Then('Choose {string} package', async function (typePackage: string) {
  // Using the shared LoginPage instance to select a package
  await this.loginPage.choosePackage(typePackage);
});
