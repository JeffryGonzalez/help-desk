import { Browser, chromium, test } from '@playwright/test';
import uuid from 'uuid-random';

test('Login', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page
    .getByPlaceholder('Enter any user/subject')
    .fill('Jeffry-' + uuid());
  await page.locator('textarea').fill('{ roles: ["tech"]}');

  await page.getByRole('button', { name: 'Sign-in' }).click();
  await page.getByText('Account').click();
  await page.getByText('Profile').click();
  await page.getByLabel('First Name').fill('Jeff');
  await page.getByLabel('Last Name').fill('Gonzalez');
  await page.getByLabel('How do you like to be').selectOption('Email');
  await page.getByLabel('Email Address').fill('jeff@aol.com');
  await page.getByText('Go Back').click();
  await page.context().storageState({ path: 'state.json' });
});
