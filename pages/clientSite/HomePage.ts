import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the Home Page.
 * @export
 * @class HomePage
 * @typedef {HomePage}
 */
export class HomePage {
  constructor(private page: Page) {}

  get homePageHeading(): Locator {
    return this.page.getByRole('heading', {
      name: 'FOODY',
      exact: true,
    });
  }

  get noFoodsMessage(): Locator {
    return this.page.getByRole('heading', {
      name: 'There are no foods :(',
    });
  }

  get learnMoreButton(): Locator {
    return this.page.getByRole('link', {
      name: 'Learn More',
    });
  }

  get searchField(): Locator {
    return this.page.getByRole('textbox', {
      name: 'keyword',
    });
  }

  get searchButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  get foodTitle(): Locator {
    return this.page.locator('.display-4').last();
  }

  get editButton(): Locator {
    return this.page.getByRole('link', {
      name: 'Edit',
    });
  }

  get deleteButton(): Locator {
    return this.page.getByRole('link', {
      name: 'Delete',
    });
  }

  /**
   * Navigate to Edit Food Page
   * @returns {Promise<void>} - Resolves when navigation to edit food page is complete.
   */
  async openEditFoodPage(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('Food/Edit') && response.status() === 200
      ),

      this.editButton.click(),
    ]);

    await expect(
      this.page.getByRole('heading', {
        name: 'Edit your food revue',
      })
    ).toBeVisible();
  }

  /**
   * Delete food
   * @returns {Promise<void>} - Resolves when food is deleted.
   */
  async deleteFood(): Promise<void> {
    await this.deleteButton.click();

    await expect(this.noFoodsMessage).toBeVisible();
  }
}
