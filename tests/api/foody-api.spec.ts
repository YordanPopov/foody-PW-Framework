import foodRecipe from '@test-data/food-recipe.json';
import { expect, test } from '@fixtures/pom/test-options';
import {
  createFoodSchema,
  deleteFoodSchema,
  editFoodSchema,
  allFoodsSchema,
  errorMsgResponseSchema,
} from '@fixtures/api/schemas';
import {
  CreateFoodResponse,
  DeleteFoodResponse,
  EditFoodResponse,
  GetAllFoodsResponse,
  ErrorMsgResponse,
} from '@fixtures/api/types-guards';

test.describe('Verify Create/Edit/Delete a Recipe', () => {
  let foodID: string;

  test(
    'Verify Create/Edit/Delete a Recipe',
    { tag: '@API' },
    async ({ apiRequest }) => {
      await test.step('Verify Create a Recipe', async () => {
        const { status, body } = await apiRequest<CreateFoodResponse>({
          method: 'POST',
          baseUrl: process.env.API_URL,
          url: 'Food/Create',
          body: {
            name: foodRecipe.create.name,
            description: foodRecipe.create.description,
            url: foodRecipe.create.imgUrl,
          },
          headers: process.env.ACCESS_TOKEN,
        });

        expect(status).toBe(201);
        expect(createFoodSchema.parse(body)).toBeTruthy();

        foodID = body.foodId;
      });

      await test.step('Verify the Created Recipe', async () => {
        const { status, body } = await apiRequest<GetAllFoodsResponse>({
          method: 'GET',
          baseUrl: process.env.API_URL,
          url: 'Food/All',
          headers: process.env.ACCESS_TOKEN,
        });

        expect(status).toBe(200);
        expect(allFoodsSchema.parse(body)).toBeTruthy();

        expect(body[0].name).toBe(foodRecipe.create.name);
        expect(body[0].id).toBe(foodID);
      });

      await test.step('Verify Edit a Recipe', async () => {
        const { status, body } = await apiRequest<EditFoodResponse>({
          method: 'PATCH',
          baseUrl: process.env.API_URL,
          url: `Food/Edit/${foodID}`,
          body: [
            {
              path: '/name',
              op: 'replace',
              value: foodRecipe.update.name,
            },
          ],
          headers: process.env.ACCESS_TOKEN,
        });

        expect(status).toBe(200);
        expect(editFoodSchema.parse(body)).toBeTruthy();
        expect(body.msg).toContain('Successfully edited');
        expect(body.foodId).toBe(foodID);
      });

      await test.step('Verify Delete a Recipe', async () => {
        const { status, body } = await apiRequest<DeleteFoodResponse>({
          method: 'DELETE',
          baseUrl: process.env.API_URL,
          url: `Food/Delete/${foodID}`,
          headers: process.env.ACCESS_TOKEN,
        });

        expect(status).toBe(200);
        expect(deleteFoodSchema.parse(body)).toBeTruthy();
        expect(body.msg).toContain('Deleted successfully!');
      });

      await test.step('Verify That the Recipe Has Been Deleted', async () => {
        const { status, body } = await apiRequest<ErrorMsgResponse>({
          method: 'GET',
          baseUrl: process.env.API_URL,
          url: 'Food/All',
          headers: process.env.ACCESS_TOKEN,
        });

        expect(status).toBe(404);
        expect(errorMsgResponseSchema.parse(body));
        expect(body.msg).toContain('No food revues...');
      });
    }
  );
});
