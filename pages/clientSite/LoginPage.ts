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
    return this.page.getByRole('button', {
      name: ' Log In ',
    });
  }

  /**
   * Login user
   * @param {object} params - Object with login fields
   * @param {string} params.username - username for the user
   * @param {string} params.password - password for the user
   * @returns {Promise<void>} - Resolves when user is logged in.
   */
  async login(params: { username: string; password: string }): Promise<void> {
    const { username, password } = params;

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await Promise.all([
      this.page.waitForResponse(
        (response) => response.url().includes('/') && response.status() === 200
      ),

      this.loginButton.click(),
    ]);

    await expect(
      this.page.getByRole('heading', {
        name: `Welcome, ${username}!`,
      })
    ).toBeVisible();
  }
}
