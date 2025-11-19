import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the SignUp Page.
 * @export
 * @class SignUpPage
 * @typedef {SignUpPage}
 */
export class SignUpPage {
  constructor(private page: Page) {}

  get usernameInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Username',
    });
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Email',
    });
  }

  get firstNameInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'First Name',
    });
  }

  get middleNameInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'First Name',
    });
  }

  get lastNameInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Last Name',
    });
  }

  get passwordInput(): Locator {
    return this.page.getByLabel('Password', {
      exact: true,
    });
  }

  get confirmPasswordInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Confirm Password',
    });
  }

  get signUpButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Sign up',
    });
  }

  /**
   * Sign up user. Middle name can be optionally filled.
   * @param {string} username - username for user.
   * @param {string} email - email for user.
   * @param {string} fName - fisrt name of user.
   * @param {string} midName - middle name of user. Optional field.
   * @param {string} lName - last name of user.
   * @param {string} pass - password.
   * @param {string} rePass - confirm password
   * @returns {Promise<void>} - Resolves when the user is registered
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
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(fName);

    if (midName) {
      await this.middleNameInput.fill(midName);
    }

    await this.lastNameInput.fill(lName);
    await this.passwordInput.fill(pass);
    await this.confirmPasswordInput.fill(rePass);

    await expect(this.page).toHaveTitle(/Home Page - Foody.WebApp/);
    await expect(
      this.page.getByText(`Welcome, ${username}!`, {
        exact: true,
      })
    ).toBeVisible();
  }
}
