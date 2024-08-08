import { expect, type Locator, type Page } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel(`Email`);
    this.password = page.getByLabel(`Password`).nth(0);
    this.button = page.locator('button', { hasText: 'Login' });
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
    try {
      await this.page.locator('button', { hasText: 'Log out' }).waitFor({timeout: 1000});
      return true;
    } catch {
      return false;
    }
  }

  async userIsLoggedIn(firstName, lastName) {
    try {
      if (await this.isLoggedIn() == false) {
        return false;
      }
      await this.page.getByText(`Welcome ${firstName} ${lastName}`).waitFor({timeout: 1000})
      return true;
    } catch {
      return false;
    }
  }
}
