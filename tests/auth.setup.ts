import { test as setup } from '../fixtures/pom/test-options';

setup('auth user', async ({ loginPage, navBar, homePage, page }) => {
  await setup.step('create logged in user session', async () => {
    await homePage.gotoHomePage();

    await navBar.openLoginPage();

    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);

    await page.context().storageState({ path: '.auth/userSession.json' });
  });
});
