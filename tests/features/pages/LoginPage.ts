import { Page } from 'playwright';


export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async enterUsername(username: string) {
    const emailField = this.page.getByRole("textbox", {name: "Email Address"});
    await emailField.fill(username);

  }

  async enterPassword(password: string) {
    const passwordField = this.page.getByRole("textbox", {name: "Password"});
    await passwordField.fill(password);

  }

  async submitLogin() {
    const loginButton = this.page.getByRole("button", {name: "Log in"});
    await loginButton.click();
  }

  async choosePackage(typePackage: string) {
    if (typePackage === 'English') {
      await this.page.getByText('CK MedEd English Package Test').click();
    }
  }
}
