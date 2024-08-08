import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    await page.goto('localhost:8080/login')

    const existingUser = existingUsers[0]

    await page.getByLabel(`Email`).fill(existingUser.email)
    await page.getByLabel(`Password`).nth(0).fill(existingUser.password)

    page.locator('button', { hasText: 'Login' }).click()

    await expect(page.getByText(`Welcome ${existingUser.firstName} ${existingUser.lastName}`))
    .toBeVisible({timeout: 1000})
  })
})
