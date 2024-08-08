import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { Signup as SignupPage } from '../../test-pages/signup'

test.describe.configure({ mode: 'serial' })

test.describe('signup form tests', () => {
  test('signup for a new account', async ({ page }) => {
    const firstName = "Firstname";
    const lastName = "Lastname";

    const signupPage = new SignupPage(page);

    await signupPage.goto("localhost:8080");
    await signupPage.enterFirstName(firstName);
    await signupPage.enterLastName(lastName);
    await signupPage.enterEmail("new@example.com");
    await signupPage.enterPassword("newpassword123");
    await signupPage.clickSubmitButton();

    expect(await signupPage.userIsLoggedIn(firstName, lastName)).toBe(true);
  })

  test('block signup if no email is entered', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.goto("localhost:8080");
    await signupPage.enterFirstName("Firstname");
    await signupPage.enterLastName("Lastname");
    await signupPage.enterPassword("newpassword123");

    expect(await signupPage.canSubmit()).toBe(false);
  })
})
