import { test, expect } from '../fixtures/home';

test.describe('home page with tech logged in', () => {
  test.beforeEach(async ({ homePage, profilePage }) => {
    await homePage.stubUser();
    await profilePage.stubContact();
    await homePage.goHome();
  });
  test('tech link is visible', async ({ homePage, page }) => {
    await expect(homePage.getTechLink()).toBeVisible();
  });

  test('check profile', async ({ profilePage, page }) => {
    await profilePage.goProfile();
    await profilePage.verifyContact();
  });
});
