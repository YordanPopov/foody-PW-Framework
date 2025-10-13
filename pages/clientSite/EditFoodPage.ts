import { Page } from '@playwright/test';
import BasePage from './BasePage';
/**
 * This is the page object for the EditFood Page.
 * @export
 * @class EditFoodPage
 * @typedef {EditFoodPage}
 */
export default class EditFoodPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly selectors = {
    nameInput: '#name',
    descriptionInput: '#description',
    imgUrl: '#url',
    addButton: 'button[type="submit"]',
  };
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
    const fields = {
      [this.selectors.nameInput]: name,
      [this.selectors.descriptionInput]: description,
      [this.selectors.imgUrl]: imgUrl,
    };

    await this.fillForm(fields);
    await this.clickElement(this.selectors.addButton);

    await this.verifyElementVisible(`h2:has-text('${name}')`);
  }
}
