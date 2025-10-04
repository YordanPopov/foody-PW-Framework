import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the EditFood Page.
 * @export
 * @class EditFoodPage
 * @typedef {EditFoodPage}
 */
export class EditFoodPage {
  constructor(private page: Page) {}

  get nameInput(): Locator {
    return this.page.locator('#name');
  }

  get descriptionInput(): Locator {
    return this.page.locator('#description');
  }

  get imgUrlInput(): Locator {
    return this.page.locator('#url');
  }

  get addButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  /**
   * Edit Food
   * @param {object} params - object with optional fields.
   * @param {string} params.name - name for the food. Optional field.
   * @param {string} params.description - description for the food. Optional field.
   * @param {string} params.imgUrl - image for the food. Optional field.
   */
  async editFood(params: {
    name?: string;
    description?: string;
    imgUrl?: string;
  }): Promise<void> {
    const { name, description, imgUrl } = params;

    if (name) {
      await this.nameInput.fill(name);
    }

    if (description) {
      await this.descriptionInput.fill(description);
    }

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
