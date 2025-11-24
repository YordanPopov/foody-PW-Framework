import { Locator, Page, expect } from '@playwright/test';
/**
 * This is the page object for the EditFood Page.
 * @export
 * @class EditFoodPage
 * @typedef {EditFoodPage}
 */
export class EditFoodPage {
  constructor(private page: Page) {}

  get foodNameInput(): Locator {
    return this.page.locator('#name');
  }

  get foodDescriptionInput(): Locator {
    return this.page.locator('#description');
  }

  get foodImgInput(): Locator {
    return this.page.locator('#url');
  }

  get editButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Add',
    });
  }
  /**
   * Edit Food
   * @param {string} name - name for the food. Optional field.
   * @param {string} description - description for the food. Optional field.
   * @param {string} imgUrl - image for the food. Optional field.
   */
  async editFood(
    name?: string,
    description?: string,
    imgUrl?: string
  ): Promise<void> {
    if (name) {
      await this.foodNameInput.fill(name);
    }
    if (description) {
      await this.foodDescriptionInput.fill(description);
    }
    if (imgUrl) {
      await this.foodImgInput.fill(imgUrl);
    }

    await this.editButton.click();

    await expect
      .soft(this.page.locator(`h2:has-text('${name}')`))
      .toBeVisible();
  }
}
