import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the AddFood Page.
 * @export
 * @class AddFoodPage
 * @typedef {AddFoodPage}
 */
export class AddFoodPage {
  constructor(private page: Page) {}

  get foodNameInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Food name',
      exact: true,
    });
  }

  get descriptionFoodInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Describe your food',
      exact: true,
    });
  }

  get imgUrlInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Add a picture of your food',
      exact: true,
    });
  }

  get addButton(): Locator {
    return this.page.getByRole('button', {
      name: ' Add ',
    });
  }

  /**
   * Add Food
   * @param {object} params - object with optional imgUrl field.
   * @param {string} params.name - name for the food.
   * @param {string} params.description - description for the food.
   * @param {string} params.imgUrl - image for the food. Optional field.
   */
  async AddFood(params: {
    name: string;
    description: string;
    imgUrl?: string;
  }): Promise<void> {
    const { name, description, imgUrl } = params;

    await this.foodNameInput.fill(name);
    await this.descriptionFoodInput.fill(description);

    if (imgUrl) {
      await this.imgUrlInput.fill(imgUrl);
    }

    await Promise.all([
      this.page.waitForResponse(
        (response) => response.url().includes('/') && response.status() === 200
      ),

      this.addButton.click(),
    ]);

    await expect(
      this.page.getByRole('heading', {
        name: name,
      })
    ).toBeVisible();
  }
}
