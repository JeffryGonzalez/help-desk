import { Locator, Page } from "@playwright/test";

export class HomePage {
    private readonly techLink: Locator;
    constructor(public readonly page: Page) {
        this.techLink = page.getByRole('link', { name: 'Techs' });
     }

     async stubUser() {
          await this.page.route('/api/user', async (route) => {
            const json = [
              {
                type: 'stream_id',
                value: '11111',
              },
              {
                type: 'sub',
                value: 'Jeffry',
              },
              {
                type: 'roles',
                value: 'tech',
              },
            ];
            await route.fulfill({ json });
          });
     }
     async goHome() {
        await this.page.goto('');
     }
    
     getTechLink = () => this.techLink
}