import { type Locator, type Page } from '@playwright/test';
import { Login as LoginComponent } from './components/login';

export class Signup {
  readonly page: Page;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly password: Locator;
  readonly button: Locator;
  readonly login: LoginComponent;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByLabel(`First name`);
    this.lastName = page.getByLabel(`Last name`);
    this.email = page.getByLabel(`Email`);
    this.password = page.getByLabel(`Password`).nth(0);
    this.button = page.locator('button', { hasText: 'Submit' });
    this.login = new LoginComponent(page);
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
    return await this.login.isLoggedIn();
  }

  async isLoggedInAs(firstName, lastName) {
    return await this.login.isLoggedInAs(firstName, lastName);
  }
}
