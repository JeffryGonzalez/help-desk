import { createFeature, createReducer, on } from "@ngrx/store";
import { UserDocuments } from "./actions";

export const contactChannels = ['Email', 'Phone', 'InPerson', 'GeneratedBySystem'] as const;
export type ContactChannels = typeof contactChannels[number];
export type UserContact = {
    contactChannel: ContactChannels | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    emailAddress: string | undefined;
    phoneNumber: string | undefined;


}
export type UserState = {
  id: string | undefined;
  lastLogin: string | undefined;
  sub: string | undefined;
  logins: number | undefined;
  version: number | undefined;
  contactChannel: UserContact | undefined
}

const initialState: UserState = {
    id: undefined,
    lastLogin: undefined,
    sub: undefined,
    logins: undefined,
    version: undefined,
    contactChannel: undefined
}

export const userFeature = createFeature({
    name: 'userFeature',
    reducer: createReducer(initialState,
        on(UserDocuments.user, (_, a) => a.payload)
    )
});