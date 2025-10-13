import { Page } from '@playwright/test';
import BasePage from './BasePage';
/**
 * This is the page object for the AddFood Page.
 * @export
 * @class AddFoodPage
 * @typedef {AddFoodPage}
 */
export default class AddFoodPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    nameInput: '#name',
    descriptionInput: '#description',
    imgUrlInput: '#url',
    addButton: 'button[type="submit"]',
  };

  /**
   * Add Food
   * @param {string} name - name for the food.
   * @param {string} description - description for the food.
   * @param {string} imgUrl - image for the food. Optional field.
   */
  async AddFood(
    name: string,
    description: string,
    imgUrl?: string
  ): Promise<void> {
    const fields = {
      [this.selectors.nameInput]: name,
      [this.selectors.descriptionInput]: description,
      [this.selectors.imgUrlInput]: imgUrl,
    };

    await this.fillForm(fields);

    await this.clickElement(this.selectors.addButton);

    await this.verifyElementVisible(`h2:has-text('${name}')`);
  }
}
