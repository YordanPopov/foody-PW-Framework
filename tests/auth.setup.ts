import { test as setup, expect } from '../fixtures/pom/test-options';
import { AuthUserResponse } from '../fixtures/api/types-guards';
import { authUserSchema } from '../fixtures/api/schemas';

setup(
  'auth user',
  async ({ loginPage, navBar, homePage, page, apiRequest }) => {
    await setup.step('auth for user by API', async () => {
      const { status, body } = await apiRequest<AuthUserResponse>({
        method: 'POST',
        baseUrl: process.env.API_URL,
        url: 'User/Authentication',
        body: {
          userName: process.env.USER_NAME,
          password: process.env.PASSWORD,
        },
      });

      expect(status).toBe(200);
      expect(authUserSchema.parse(body)).toBeTruthy();

      process.env['ACCESS_TOKEN'] = body.accessToken;
    });

    await setup.step('create logged in user session', async () => {
      await homePage.gotoHomePage();

      await navBar.openLoginPage();

      await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);

      await page.context().storageState({ path: '.auth/userSession.json' });
    });
  }
);
