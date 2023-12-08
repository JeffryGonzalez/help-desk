import { Locator, Page } from "@playwright/test";
export type StubbedUserClaims = {
  type: string;
  value: string;
}[];
export const stubbedTechUser:StubbedUserClaims = [
  {
    type: 'stream_id',
    value: '11111',
  },
  {
    type: 'sub',
    value: 'Buffy',
  },
  {
    type: 'roles',
    value: 'tech',
  },
];
export class HomePage {
    private readonly techLink: Locator;
    constructor(public readonly page: Page) {
        this.techLink = page.getByRole('link', { name: 'Techs' });
     }

     async stubUser({stubbedUserClaims}: { stubbedUserClaims?: StubbedUserClaims } = { }) {
        stubbedUserClaims = stubbedUserClaims || stubbedTechUser;
          await this.page.route('/api/user', async (route) => {
            
            await route.fulfill({ json:stubbedUserClaims });
          });
     }
     async goHome() {
        await this.page.goto('');
     }
    
     getTechLink = () => this.techLink
}

