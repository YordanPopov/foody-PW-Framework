import { Page } from '@playwright/test';
import BasePage from './BasePage';
/**
 * This is the page object for the Login Page.
 * @export
 * @class LoginPage
 * @typedef {LoginPage}
 */
export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    usernameInput: 'input[name="Username"]',
    passwordInput: 'input[name="Password"]',
    loginButton: 'button[type="submit"]',
  };

  /**
   * Login user
   * @param username - username for the user.
   * @param password - password for the user.
   * @returns {Promise<void>} - Resolves when user is logged in.
   */
  async login(username: string, password: string): Promise<void> {
    const fields = {
      [this.selectors.usernameInput]: username,
      [this.selectors.passwordInput]: password,
    };

    await this.fillForm(fields);

    await this.clickElement(this.selectors.loginButton);
    await this.verifyElementVisible(`h2:has-text('Welcome, ${username}')`);
  }
}
