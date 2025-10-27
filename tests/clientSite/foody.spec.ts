import { test } from '../../fixtures/pom/test-options';
import foodData from '../../test-data/food-recipe.json';

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

        await addFoodPage.AddFood(
          foodData.create.foodRecipe.name,
          foodData.create.foodRecipe.description,
          foodData.create.foodRecipe.imgUrl
        );
      });

      await test.step('Verify Edit Food Recipe', async () => {
        test.fail();
        await homePage.openEditFoodPage();

        editFoodPage.editFood(
          foodData.update.name,
          foodData.update.description
        );
      });

      await test.step('Verify Delete Food Recipe', async () => {
        await homePage.deleteFood();
      });
    }
  );
});
