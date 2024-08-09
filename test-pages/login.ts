import { type Locator, type Page } from '@playwright/test';
import { Login as LoginComponent } from './components/login';

export class Login {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly button: Locator;
  readonly login: LoginComponent;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel(`Email`);
    this.password = page.getByLabel(`Password`).nth(0);
    this.button = page.locator('button', { hasText: 'Login' });
    this.login = new LoginComponent(page);
  }

   async goto(host: String) {
    await this.page.goto(`${host}/login`);
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async enterEmail(email) {
    await this.email.fill(email);
  }

  async clickLoginButton() {
    await this.button.click();
  }

  async isLoggedIn() {
    return await this.login.isLoggedIn();
  }

  async isLoggedInAs(firstName, lastName) {
    return await this.login.isLoggedInAs(firstName, lastName);
  }
}
