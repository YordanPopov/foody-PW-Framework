import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the Home Page.
 * @export
 * @class HomePage
 * @typedef {HomePage}
 */
export class HomePage {
  constructor(private page: Page) {}

  get learnMoreButton(): Locator {
    return this.page.getByRole('link', {
      name: 'Learn More',
    });
  }

  get editButton(): Locator {
    return this.page.getByRole('link', {
      name: 'Edit',
    });
  }

  get deleteButton(): Locator {
    return this.page.locator('a:has-text("Delete")');
  }

  /**
   * Navigate to the Home Page
   * @returns {Promise<void>} - Resolves when Home Page is opened.
   */
  async gotoHomePage(): Promise<void> {
    await this.page.goto(process.env.URL as string);

    await expect(this.page).toHaveTitle(/Home Page - Foody.WebApp/);
  }

  /**
   * Navigate to Edit Food Page
   * @returns {Promise<void>} - Resolves when navigation to edit food page is complete.
   */
  async openEditFoodPage(): Promise<void> {
    await this.editButton.click();

    await expect(this.page).toHaveTitle(/Add Food - Foody.WebApp/);
    await expect(
      this.page.getByText('Edit your food revue', {
        exact: true,
      })
    ).toBeVisible();
  }

  /**
   * Delete food
   * @returns {Promise<void>} - Resolves when food is deleted.
   */
  async deleteFood(): Promise<void> {
    await this.deleteButton.click();

    await expect(
      this.page.getByText('There are no foods :(', {
        exact: true,
      })
    ).toBeVisible();
  }
}
