import { test as base } from '@playwright/test';
import { NavigationBar } from '@pages/clientSite/Navigation.Bar';
import { HomePage } from '@pages/clientSite/Home.Page';
import { LoginPage } from '@pages/clientSite/Login.Page';
import { SignUpPage } from '@pages/clientSite/SignUp.Page';
import { AddFoodPage } from '@pages/clientSite/Add.Food.Page';
import { EditFoodPage } from '@pages/clientSite/Edit.Food.Page';

export type FrameworkFixtures = {
  navBar: NavigationBar;

  homePage: HomePage;

  loginPage: LoginPage;

  signUpPage: SignUpPage;

  addFoodPage: AddFoodPage;

  editFoodPage: EditFoodPage;
};

export const test = base.extend<FrameworkFixtures>({
  navBar: async ({ page }, use) => {
    await use(new NavigationBar(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },

  addFoodPage: async ({ page }, use) => {
    await use(new AddFoodPage(page));
  },

  editFoodPage: async ({ page }, use) => {
    await use(new EditFoodPage(page));
  },
});

export { expect } from '@playwright/test';
