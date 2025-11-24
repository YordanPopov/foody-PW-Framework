import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the Login Page.
 * @export
 * @class LoginPage
 * @typedef {LoginPage}
 */
export class LoginPage {
  constructor(private page: Page) {}

  get usernameInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Username',
    });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Password',
    });
  }

  get loginButton(): Locator {
    return this.page.locator('button:has-text("LOG IN")');
  }

  get createNewAccountButton(): Locator {
    return this.page.getByRole('link', {
      name: 'Create new',
    });
  }

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>} - Resolves when the user is logged in
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    await expect.soft(this.page).toHaveTitle(/Home Page - Foody.WebApp/);
    await expect
      .soft(
        this.page.getByText(`Welcome, ${username}!`, {
          exact: true,
        })
      )
      .toBeVisible();
  }
}
