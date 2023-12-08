import { Locator, Page, expect } from '@playwright/test';
import { UserContact } from 'app/features/user/features/profile/types';

const contactJson:UserContact = {
  firstName: 'Buffy',
  lastName: 'Summers',
  emailAddress: 'buffy@aol.com',
  contactChannel: 'Email',
  phoneNumber: ''
};

export class ProfilePage {
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly contactChannel: Locator;
    private readonly emailAddress: Locator;
    private readonly phoneNumber: Locator;
    private assignedContact: UserContact = contactJson;
  constructor(public readonly page: Page) {
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.contactChannel = page.getByTestId('contactChannel');
    this.emailAddress = page.getByTestId('emailAddress');
    this.phoneNumber = page.getByTestId('phoneNumber');
  }

  async stubContact(contact?: UserContact) {
    contact = contact || contactJson;
    await this.page.route('/api/users/11111/contact', async (route) => {
      await route.fulfill({ json: contact });
    });
    this.assignedContact = contact;
  }

    async goProfile() {
       
        await this.page.getByText('Account').click();
        await this.page.getByText('Profile').click();
    }

    getFirstName = () => this.firstName;
    getLastName = () => this.lastName;
    getContactChannel = () => this.contactChannel;
    getEmailAddress = () => this.emailAddress;
    getPhoneNumber = () => this.phoneNumber;

    async verifyContact() {

        await expect(this.getFirstName()).toHaveValue(this.assignedContact.firstName );
        await expect(this.getLastName()).toHaveValue(this.assignedContact.lastName );
        await expect(this.getContactChannel()).toHaveValue(this.assignedContact.contactChannel );
        await expect(this.getEmailAddress()).toHaveValue(this.assignedContact.emailAddress );
        await expect(this.getPhoneNumber()).toHaveValue(this.assignedContact.phoneNumber );

    }
}
