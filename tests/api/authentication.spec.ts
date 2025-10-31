import { test } from '../../fixtures/pom/test-options';
import invalidCredentials from '../../test-data/invalid-credentials.json';
import {
  testInvalidValues,
  generateUniqueEmail,
  generateUniqueUsername,
} from '../../fixtures/api/api-test-helpers';

test.describe('Verify API Validation for Log In / Sign Up', () => {
  test(
    'Verify API Validation For Log In',
    { tag: '@API' },
    async ({ apiRequest }) => {
      await test.step('Verify API Validation for Invalid Username', async () => {
        await testInvalidValues(
          invalidCredentials.invalidUsernames,
          (username) => ({
            userName: username,
            password: process.env.PASSWORD,
          }),
          apiRequest,
          'User/Authentication',
          true
        );
      });

      await test.step('Verify API Validation for Invalid Password', async () => {
        await testInvalidValues(
          invalidCredentials.invalidPasswords,
          (password) => ({
            userName: process.env.USER_NAME,
            password: password,
          }),
          apiRequest,
          'User/Authentication',
          true
        );
      });
    }
  );

  test(
    'Verify API Validation for Sign Up',
    { tag: '@API' },
    async ({ apiRequest }) => {
      await test.step('Verify API Validation For Invalid Username', async () => {
        await testInvalidValues(
          invalidCredentials.invalidUsernames,
          (username) => ({
            userName: username,
            email: generateUniqueEmail(),
            firstName: process.env.FIRST_NAME,
            lastName: process.env.LAST_NAME,
            password: process.env.PASSWORD,
            rePassword: process.env.PASSWORD,
          }),
          apiRequest,
          'User/Create',
          false
        );
      });

      await test.step('Verify API Validation For Invalid Password', async () => {
        await testInvalidValues(
          invalidCredentials.invalidPasswords,
          (password) => ({
            userName: generateUniqueUsername(),
            email: generateUniqueEmail(),
            firstName: process.env.FIRST_NAME,
            lastName: process.env.LAST_NAME,
            password: password,
            rePassword: password,
          }),
          apiRequest,
          'User/Create',
          false
        );
      });

      await test.step('Verify API Validation For Invalid Email', async () => {
        await testInvalidValues(
          invalidCredentials.invalidEmails,
          (email) => ({
            userName: generateUniqueUsername(),
            email: email,
            firstName: process.env.FIRST_NAME,
            lastName: process.env.LAST_NAME,
            password: process.env.PASSWORD,
            rePassword: process.env.PASSWORD,
          }),
          apiRequest,
          'User/Create',
          false
        );
      });

      await test.step('Verify API Validation For Invalid Firstname', async () => {
        await testInvalidValues(
          invalidCredentials.InvalidFirstNames,
          (firstName) => ({
            userName: generateUniqueUsername(),
            email: generateUniqueEmail(),
            firstName: firstName,
            lastName: process.env.LAST_NAME,
            password: process.env.PASSWORD,
            rePassword: process.env.PASSWORD,
          }),
          apiRequest,
          'User/Create',
          false
        );
      });

      await test.step('Verify API Validation For Invalid Middlename', async () => {
        await testInvalidValues(
          invalidCredentials.InvalidMiddleNames,
          (middleName) => ({
            userName: generateUniqueUsername(),
            email: generateUniqueEmail(),
            firstName: process.env.FIRST_NAME,
            midName: middleName,
            lastName: process.env.LAST_NAME,
            password: process.env.PASSWORD,
            rePassword: process.env.PASSWORD,
          }),
          apiRequest,
          'User/Create',
          false
        );
      });

      await test.step('Verify API Validation For Invalid Lastname', async () => {
        await testInvalidValues(
          invalidCredentials.InvalidLastNames,
          (lastName) => ({
            userName: generateUniqueUsername(),
            email: generateUniqueEmail(),
            firstName: process.env.FIRST_NAME,
            lastName: lastName,
            password: process.env.PASSWORD,
            rePassword: process.env.PASSWORD,
          }),
          apiRequest,
          'User/Create',
          false
        );
      });
    }
  );
});
