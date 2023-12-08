import { HomePage } from "./home-page";
import { test as base } from '@playwright/test';
import { ProfilePage } from "./profile-page";

type HomeFixture = {
    homePage: HomePage;
    profilePage: ProfilePage
}

export const test = base.extend<HomeFixture>({
    homePage: async ({ page }, use) => {
       
      
        const homePage = new HomePage(page);
     
        await use(homePage);
       
    },
    profilePage: async ({ page }, use) => {
       
      
        const profilePage = new ProfilePage(page);
        await use(profilePage);
    }
});

export {expect} from '@playwright/test'