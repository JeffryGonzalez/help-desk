import { createFeature, createReducer, on } from "@ngrx/store";
import { UserDocuments } from "../../state/actions";

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

const initialState: UserContact = {
    contactChannel: 'GeneratedBySystem',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    
};
export const UserContactFeature = createFeature({
    name: 'UserContactFeature',
    reducer: createReducer(initialState, on(UserDocuments.user, (state, { payload }) => payload.contact!)),
})