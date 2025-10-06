import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the Base Page.
 * @export
 * @class BasePage
 * @typedef {BasePage}
 */
export default abstract class BasePage {
  protected constructor(protected page: Page) {}

  protected async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  protected async clickElement(locator: string): Promise<void> {
    await this.page.locator(locator).click();
  }

  protected async verifyElementVisible(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  protected async fillIntoLocator(
    locator: string,
    value: string
  ): Promise<void> {
    await this.page.locator(locator).fill(value);
  }

  protected async fillForm(fields: { [key: string]: string }): Promise<void> {
    for (const [locator, value] of Object.entries(fields)) {
      await this.fillIntoLocator(locator, value);
    }
  }
}
