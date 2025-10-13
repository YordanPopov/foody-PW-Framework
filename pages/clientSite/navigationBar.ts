import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import { setEngine } from 'crypto';
/**
 * This is the page object for the NavigationBar Page.
 * @export
 * @class NavigationBar
 * @typedef {NavigationBar}
 */
export default class NavigationBar extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    homePageNavigationLink: 'a:has-text("FOODY")',
    loginPageNavigationLink: 'a:has-text("Log In")',
    signUpPageNavigationLink: 'a:has-text("Sign Up")',
    addFoodNavigationLink: 'a.nav-link:has-text("Add Food")',
    logoutLink: 'a:has-text("Logout")',
  };

  /**
   * Navigate to the Login page
   * @returns {Promise<void>} - Resolves when navigation to the login page is complete.
   */
  async openLoginPage(): Promise<void> {
    await this.clickElement(this.selectors.loginPageNavigationLink);

    await this.verifyElementVisible(
      'p:has-text("Please login to your account")'
    );
  }

  /**
   * Navigate to the SignUp page
   * @returns {Promise<void>} - Resolves when navigation to the signup page is complete.
   */
  async openSignUpPage(): Promise<void> {
    await this.clickElement(this.selectors.signUpPageNavigationLink);

    await this.verifyElementVisible(
      'p:has-text("Please register new account")'
    );
  }

  /**
   * Navigate to the Add Food page
   * @returns {Promise<void>} - Resolves when navigation to the add food page is complete.
   */
  async openAddFoodPage(): Promise<void> {
    await this.clickElement(this.selectors.addFoodNavigationLink);

    await this.verifyElementVisible('h4.mt-1');
  }

  /**
   * user logout
   * @returns {Promise<void>} - Resolves when user is logged out.
   */
  async logout(): Promise<void> {
    await this.clickElement(this.selectors.logoutLink);

    await this.verifyElementVisible('a:has-text("Learn More")');
  }
}
