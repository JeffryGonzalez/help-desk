import { HttpClient } from "@angular/common/http";
import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { distinctUntilChanged, filter, mergeMap, pipe, skip, switchMap, tap } from "rxjs";
import { AuthStore } from "../../auth/auth.store";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileService } from "./profie.service";

type Thingy = {
  id: string | undefined;
  pendingChange: PendingChangeType | undefined;
  
};
export const contactChannels = [
  'Email',
  'Phone',
  'InPerson',
  'GeneratedBySystem',
] as const;
export type ContactChannels = (typeof contactChannels)[number];
export type UserContact = {
  contactChannel: ContactChannels ;
  firstName: string ;
  lastName: string ;
  emailAddress: string ;
  phoneNumber: string ;
};
export type UserContactKey = keyof UserContact;
export type PendingChangeType = { prop: UserContactKey, value: unknown};
export type UserState = {
  id: string | undefined;

  version: number | undefined;
  contact: UserContact ;
  loading: boolean;
  isSavingContactKey: UserContactKey | undefined;
  pendingChange:  PendingChangeType | undefined;
};
const initialState: UserState = {
  id: undefined,
  version: undefined,
  contact: {
    contactChannel: 'GeneratedBySystem',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  },
  loading: true,
  isSavingContactKey: undefined,
  pendingChange: undefined,
};
export const UserStore = signalStore(
  withState(initialState),
  withMethods(
    (
      { contact, pendingChange, ...state },
      client = inject(ProfileService)
    ) => ({
      setUserState(key: UserContactKey, value: unknown) {
        patchState(state, {
          contact: { ...contact(), [key]: value },
          isSavingContactKey: key,
          pendingChange: { prop: key, value },
        });
      },
      async loadUser(id:string) {
        const user = await client.loadUser(id);
        patchState(state, { ...user, loading: false });
      },
      saveUserProp: rxMethod<Thingy>(
        pipe(
          distinctUntilChanged(),
          takeUntilDestroyed(),

          filter((a) => {
            console.log('filtering user prop', a);
            return a.pendingChange !== undefined;
          }),
          tap((a) => {
            console.log('saving user prop', a);
          }),
          mergeMap((s) =>
            client.updateUserContactInfo(s.id!, s.pendingChange!).pipe(
              tap(() => {
                patchState(state, {
                  isSavingContactKey: undefined,
                  pendingChange: undefined,
                });
              })
            )
          )
        )
      ),
    })
  ),
  withComputed(
    (
      { contact, isSavingContactKey, pendingChange, ...state },
      auth = inject(AuthStore)
    ) => ({
      firstNameIsValid: computed(() => firstNameValid(contact())),
      lastNameIsValid: computed(() => lastNameValid(contact())),
      contactChannelIsValid: computed(() => contactChannelIsValid(contact())),
      contactEmailIsValid: computed(() => emailValid(contact())),
      contactPhoneIsValid: computed(() => phoneValid(contact())),
      contactIsValid: computed(() => contactIsValid(contact())),
      contactInvalid: computed(() => !contactIsValid(contact())),
      isSavingContact: computed(
        () =>
          isSavingContactKey() !== undefined && pendingChange() !== undefined
      ),
      streamId: computed(() => (auth?.streamId ? auth?.streamId() : undefined)),
      state: computed(
        () => ({ id: state.id(), pendingChange: pendingChange() } as Thingy)
      ),
    })
  ),
  withHooks({
    async onInit({ saveUserProp, state }) {
      
      saveUserProp(state);
    },
  })
);

function emailValid(contact:UserContact): boolean {
    if (contact.contactChannel === 'Email') {
      return contact.emailAddress.length > 0;
    }
    return true;
}
function phoneValid(contact:UserContact): boolean {
    if (contact.contactChannel === 'Phone') {
      return contact.phoneNumber.length > 0;
    }
    return true;

  }

function firstNameValid(contact: UserContact) {
  return  contact.firstName.length > 0;
}

function lastNameValid(contact: UserContact) {
  return contact.lastName.length > 0;
}
function contactChannelIsValid(contact:UserContact) {
  return contact.contactChannel !== 'GeneratedBySystem';
}
function contactIsValid(contact: UserContact) {
  return firstNameValid(contact) && lastNameValid(contact) && contactChannelIsValid(contact) && emailValid(contact) && phoneValid(contact);
}

