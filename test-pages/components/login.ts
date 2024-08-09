import { type Locator, type Page } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
      this.page = page;
      this.logoutButton = page.locator('button', { hasText: 'Log out' });
  }

  async isLoggedIn() {
    try {
      await this.logoutButton.waitFor({timeout: 1000});
      return true;
    } catch {
      return false;
    }
  }

  async isLoggedInAs(firstName, lastName) {
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

