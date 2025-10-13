import { Page } from '@playwright/test';
import BasePage from './BasePage';
/**
 * This is the page object for the SignUp Page.
 * @export
 * @class SignUpPage
 * @typedef {SignUpPage}
 */
export default class SignUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    usernameInput: '#username',
    emailInput: '#email',
    firstNameInput: '#firstName',
    middleNameInput: '#midName',
    lastNameInput: '#lastName',
    passwordInput: '#password',
    rePasswordInput: '#rePassword',
    signUpButton: 'button[type="submit"]',
  };

  /**
   * Sign up user. Middle name can be optionally filled.
   * @param {string} username - username for user.
   * @param {string} email - email for user.
   * @param {string} fName - fisrt name of user.
   * @param {string} midName - middle name of user. Optional field.
   * @param {string} lName - last name of user.
   * @param {string} pass - password.
   * @param {string} rePass - confirm password
   */
  async signUp(
    username: string,
    email: string,
    fName: string,
    lName: string,
    pass: string,
    rePass: string,
    midName?: string
  ): Promise<void> {
    const fields = {
      [this.selectors.usernameInput]: username,
      [this.selectors.emailInput]: email,
      [this.selectors.firstNameInput]: fName,
      [this.selectors.middleNameInput]: midName,
      [this.selectors.lastNameInput]: lName,
      [this.selectors.passwordInput]: pass,
      [this.selectors.rePasswordInput]: rePass,
    };

    await this.fillForm(fields);
    await this.clickElement(this.selectors.signUpButton);
    await this.verifyElementVisible(`h2:has-text('Welcome, ${username}')`);
  }
}
