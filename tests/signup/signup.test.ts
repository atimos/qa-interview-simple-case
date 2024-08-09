import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { Signup as SignupPage } from '../../test-pages/signup'
import { Login as LoginPage } from '../../test-pages/login'
import { Start as StartPage } from '../../test-pages/start'

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

    expect(await signupPage.isLoggedInAs(firstName, lastName)).toBe(true);
  })

  test('can login with newly created account', async ({ page }) => {
    const email = "new@email.com";
    const password = "newpassword123";

    const signupPage = new SignupPage(page);

    await signupPage.goto("localhost:8080");
    await signupPage.enterFirstName("Firstname");
    await signupPage.enterLastName("Lastname");
    await signupPage.enterEmail(email);
    await signupPage.enterPassword(password);
    await signupPage.clickSubmitButton();

    await (new StartPage(page)).logOut();

    const loginPage = new LoginPage(page);

    await loginPage.goto("localhost:8080");
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();

    expect(await loginPage.isLoggedIn()).toBe(true);

    
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
