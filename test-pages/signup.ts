import { expect, type Locator, type Page } from '@playwright/test';

export class Signup {
  readonly page: Page;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly password: Locator;
  readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByLabel(`First name`);
    this.lastName = page.getByLabel(`Last name`);
    this.email = page.getByLabel(`Email`);
    this.password = page.getByLabel(`Password`).nth(0);
    this.button = page.locator('button', { hasText: 'Submit' });
  }

   async goto(host: String) {
    await this.page.goto(`${host}/signup`);
  }

  async enterFirstName(firstName) {
    await this.firstName.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastName.fill(lastName);
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async enterEmail(email) {
    await this.email.fill(email);
  }

  async canSubmit() {
    return !await this.button.isDisabled();
  }

  async clickSubmitButton() {
    await this.button.click();
  }

  async isLoggedIn() {
    try {
      await page.locator('button', { hasText: 'Log out' }).waitFor({timeout: 1000});
      return true;
    } catch {
      return false;
    }
  }

  async userIsLoggedIn(firstName, lastName) {
    try {
      await this.isLoggedIn();
      await this.page.getByText(`Welcome ${firstName} ${lastName}`).waitFor({timeout: 1000})
      return true;
    } catch {
      return false;
    }
  }
}
