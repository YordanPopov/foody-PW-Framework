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
      name: 'UserName',
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
      name: 'Middle Name',
    });
  }

  get lastNameInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Last Name',
    });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Password',
      exact: true,
    });
  }

  get confirmPasswordInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Confirm Password',
      exact: true,
    });
  }

  get signUpButton(): Locator {
    return this.page.getByRole('button', {
      name: ' Sign up ',
    });
  }

  /**
   * Sign up user. Middle name can be optionally filled.
   * @param {object} params - object with optional fields.
   * @param {string} params.username - username for user.
   * @param {string} params.email - email for user.
   * @param {string} params.firstName - fisrt name of user.
   * @param {string} params.middleName - middle name of user. Optional field.
   * @param {string} params.lastName - last name of user.
   * @param {string} params.password - password.
   * @param {string} params.rePassword - confirm password
   */
  async signUp(params: {
    username: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    password: string;
    rePassword: string;
  }): Promise<void> {
    const {
      username,
      email,
      firstName,
      middleName,
      lastName,
      password,
      rePassword,
    } = params;

    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    if (middleName) {
      await this.middleNameInput.fill(middleName);
    }
    await this.lastNameInput.fill(lastName);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(rePassword);

    await Promise.all([
      this.page.waitForResponse(
        (response) => response.url().includes('/') && response.status() === 200
      ),

      this.signUpButton.click(),
    ]);

    await expect(
      this.page.getByRole('heading', {
        name: `Welcome, ${username}!`,
      })
    ).toBeVisible();
  }
}
