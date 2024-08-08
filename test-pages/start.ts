import { expect, type Locator, type Page } from '@playwright/test';

export class Start {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('button', { hasText: 'Log out' });
  }

   async logOut(host: String) {
    await this.logoutButton.click();
  }
}
