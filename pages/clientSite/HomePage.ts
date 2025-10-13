import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
/**
 * This is the page object for the Home Page.
 * @export
 * @class HomePage
 * @typedef {HomePage}
 */
export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    homePageHeading: 'h1:has-text("FOODY")',
    noFoodsMessage: 'h2.display-4',
    learnMoreButton: 'a:has-text("Learn More")',
    searchField: 'input[type="search"]',
    searchButton: 'button[type="submit"]',
    foodTitle: '.display-4',
    editButton: 'a:has-text("Edit")',
    deleteButton: 'a:has-text("Delete")',
  };

  /**
   * Navigate to the Home Page
   * @returns {Promise<void>} - Resolves when Home Page is opened.
   */
  async gotoHomePage(): Promise<void> {
    await this.navigate(process.env.URL as string);
  }

  /**
   * Navigate to Edit Food Page
   * @returns {Promise<void>} - Resolves when navigation to edit food page is complete.
   */
  async openEditFoodPage(): Promise<void> {
    await this.clickElement(this.selectors.editButton);
    await this.verifyElementVisible('h4.mt-1');
  }

  /**
   * Delete food
   * @returns {Promise<void>} - Resolves when food is deleted.
   */
  async deleteFood(): Promise<void> {
    await this.clickElement(this.selectors.deleteButton);
    await this.verifyElementVisible(this.selectors.noFoodsMessage);
  }
}
