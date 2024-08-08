import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { Login as LoginPage } from '../../test-pages/login'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    const { email, password, firstName, lastName } = existingUsers[0]

    const loginPage = new LoginPage(page);

    await loginPage.goto("localhost:8080");
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();

    expect(await loginPage.userIsLoggedIn(firstName, lastName)).toBe(true);
  })
})
