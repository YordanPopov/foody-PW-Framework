import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the NavigationBar Page.
 * @export
 * @class NavigationBar
 * @typedef {NavigationBar}
 */
export class NavigationBar {
  constructor(private page: Page) {}

  get homePageNavigationLink(): Locator {
    return this.page.getByRole('link', {
      name: 'FOODY',
      exact: true,
    });
  }

  get loginPageNavigationLink(): Locator {
    return this.page.getByRole('link', {
      name: 'Log In',
      exact: true,
    });
  }

  get signUpPageNavigationLink(): Locator {
    return this.page.getByRole('link', {
      name: 'Sign Up',
      exact: true,
    });
  }

  get addFoodNavigationLink(): Locator {
    return this.page.getByRole('link', {
      name: 'Add Food',
      exact: true,
    });
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', {
      name: 'Logout',
      exact: true,
    });
  }

  /**
   * Navigate to the Login page
   * @returns {Promise<void>} - Resolves when navigation to the login page is complete.
   */
  async openLoginPage(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('User/Login') && response.status() === 200
      ),

      this.loginPageNavigationLink.click(),
    ]);

    await expect(
      this.page.getByText('Please login to your account')
    ).toBeVisible();
  }

  /**
   * Navigate to the SignUp page
   * @returns {Promise<void>} - Resolves when navigation to the signup page is complete.
   */
  async openSignUpPage(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('User/Register') && response.status() === 200
      ),

      this.signUpPageNavigationLink.click(),
    ]);

    await expect(
      this.page.getByText('Please register new account')
    ).toBeVisible();
  }

  /**
   * Navigate to the Add Food page
   * @returns {Promise<void>} - Resolves when navigation to the add food page is complete.
   */
  async openAddFoodPage(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('Food/Add') && response.status() === 200
      ),

      this.addFoodNavigationLink.click(),
    ]);

    await expect(
      this.page.getByRole('button', {
        name: ' Add ',
      })
    ).toBeVisible();
  }

  /**
   * user logout
   * @returns {Promise<void>} - Resolves when user is logged out.
   */
  async logout(): Promise<void> {
    await this.logoutLink.click();

    await expect(
      this.page.getByRole('link', {
        name: 'Learn More',
      })
    ).toBeVisible();
  }
}
