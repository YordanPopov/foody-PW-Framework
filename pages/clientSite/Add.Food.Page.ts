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
    });
  }

  get foodDescriptionInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Describe your food',
    });
  }

  get foodImgInput(): Locator {
    return this.page.getByRole('textbox', {
      name: 'Add a picture of your food',
    });
  }

  get addButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Add',
    });
  }

  /**
   * Add Food
   * @param {string} name - name for the food.
   * @param {string} description - description for the food.
   * @param {string} imgUrl - image for the food. Optional field.
   * @returns {Promise<void>} - Resolves when the food is added.
   */
  async AddFood(
    name: string,
    description: string,
    imgUrl?: string
  ): Promise<void> {
    await this.foodNameInput.fill(name);
    await this.foodDescriptionInput.fill(description);
    if (imgUrl) {
      await this.foodImgInput.fill(imgUrl);
    }

    await this.addButton.click();

    await expect
      .soft(this.page.locator(`h2:has-text('${name}')`))
      .toBeVisible();
  }
}
