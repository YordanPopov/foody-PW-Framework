import { test } from '@fixtures/pom/test-options';
import foodData from '@test-data/food-recipe.json';
import {
  DeleteFoodResponse,
  GetAllFoodsResponse,
} from '@fixtures/api/types-guards';

test.describe('Verify Create/Edit/Delete Food Recipe', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.gotoHomePage();
  });

  test(
    'Verify Create/Edit/Delete food recipe',
    { tag: '@Smoke' },
    async ({ navBar, homePage, addFoodPage, editFoodPage, page }) => {
      await test.step('Verify Create Food Recipe', async () => {
        await navBar.openAddFoodPage();

        await addFoodPage.AddFood(
          foodData.create.name,
          foodData.create.description,
          foodData.create.imgUrl
        );
      });

      await test.step('Verify Edit Food Recipe', async () => {
        //test.fail();
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

  test.afterAll(async ({ apiRequest }) => {
    let foodID: string = '';
    try {
      const { status, body } = await apiRequest<GetAllFoodsResponse>({
        method: 'GET',
        baseUrl: process.env.API_URL,
        url: 'Food/All',
        headers: process.env.ACCESS_TOKEN,
      });

      if (status === 200) {
        foodID = body[0].id;
      }
    } catch (error) {
      console.log('No Recipe to Clean Up!');
    }

    await apiRequest<DeleteFoodResponse>({
      method: 'DELETE',
      baseUrl: process.env.API_URL,
      url: `Food/Delete/${foodID}`,
      headers: process.env.ACCESS_TOKEN,
    });
  });
});
