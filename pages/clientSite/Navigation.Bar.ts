import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the NavigationBar Page.
 * @export
 * @class NavigationBar
 * @typedef {NavigationBar}
 */
export class NavigationBar {
  constructor(private page: Page) {}

  get loginLink(): Locator {
    return this.page.getByRole('link', {
      name: 'Log In',
    });
  }

  get signUpLink(): Locator {
    return this.page.getByRole('link', {
      name: 'Sign Up',
    });
  }

  get homePageLink(): Locator {
    return this.page.getByRole('link', {
      name: 'FOODY',
    });
  }

  get myProfileIcon(): Locator {
    return this.page.locator('.nav-link.mx-3');
  }

  get addFoodLink(): Locator {
    return this.page.locator('a.nav-link').filter({
      hasText: 'Add Food',
    });
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', {
      name: 'Logout',
    });
  }

  /**
   * Navigate to the Home Page
   * @returns {Promise<void>} - Resolves when navigation to the home page is complete.
   */
  async openHomePage(): Promise<void> {
    await this.homePageLink.click();

    await expect.soft(this.page.locator('h1:has-text("FOODY")')).toBeVisible();
  }

  /**
   * Navigate to the Login page
   * @returns {Promise<void>} - Resolves when navigation to the login page is complete.
   */
  async openLoginPage(): Promise<void> {
    await this.loginLink.click();

    await expect
      .soft(
        this.page.getByText('Please login to your account', {
          exact: true,
        })
      )
      .toBeVisible();
  }

  /**
   * Navigate to the SignUp page
   * @returns {Promise<void>} - Resolves when navigation to the signup page is complete.
   */
  async openSignUpPage(): Promise<void> {
    await this.signUpLink.click();

    await expect
      .soft(
        this.page.getByText('Please register new account', {
          exact: true,
        })
      )
      .toBeVisible();
  }
  /**
   * Navigate to the Add Food page
   * @returns {Promise<void>} - Resolves when navigation to the add food page is complete.
   */
  async openAddFoodPage(): Promise<void> {
    await this.addFoodLink.click();

    await expect.soft(this.page.locator('h4.mt-1.mb-5.pb-1')).toBeVisible();
  }

  async openMyProfilePage(): Promise<void> {
    await this.myProfileIcon.click();

    await expect
      .soft(this.page.getByText('About me:', { exact: true }))
      .toBeVisible();
  }

  /**
   * user logout
   * @returns {Promise<void>} - Resolves when user is logged out.
   */
  async logout(): Promise<void> {
    await this.logoutLink.click();

    await expect
      .soft(
        this.page.getByText(
          'Share your homemade or store-bought food with us!',
          {
            exact: true,
          }
        )
      )
      .toBeVisible();
  }
}
