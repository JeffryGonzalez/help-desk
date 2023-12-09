
export const contactChannels = [
  'Email',
  'Phone',
  'InPerson',
  'GeneratedBySystem',
] as const;
export type ContactChannels = (typeof contactChannels)[number];
export type UserContact = {
  contactChannel: ContactChannels;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
};
export type UserContactKey = keyof UserContact;

