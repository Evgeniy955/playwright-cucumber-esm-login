import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { LoginPage } from '../tests/features/pages/LoginPage.ts';
import { CustomWorld } from './world';

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
    const browserName = this.parameters.browserName || 'chromium';
    await this.init(browserName);

    this.loginPage = new LoginPage(this.page);
});

After(async function (this: CustomWorld) {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});
