import { test } from '../../fixtures/pom/test-options';
import foodData from '../../test-data/foodRecipe.json';

test.describe('Verify Create/Edit/Delete Food Recipe', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.gotoHomePage();
  });

  test(
    'Verify Create/Edit/Delete food recipe',
    { tag: '@Smoke' },
    async ({ navBar, homePage, addFoodPage, editFoodPage }) => {
      await test.step('Verify Create Food Recipe', async () => {
        await navBar.openAddFoodPage();

        await addFoodPage.AddFood({
          name: foodData.create.foodRecipe.name,
          description: foodData.create.foodRecipe.description,
          imgUrl: foodData.create.foodRecipe.imgUrl,
        });
      });

      await test.step('Verify Edit Food Recipe', async () => {
        await homePage.openEditFoodPage();

        editFoodPage.editFood({
          name: foodData.update.name,
          description: foodData.update.description,
        });
      });

      await test.step('Verify Delete Food Recipe', async () => {
        await homePage.deleteFood();
      });
    }
  );
});
