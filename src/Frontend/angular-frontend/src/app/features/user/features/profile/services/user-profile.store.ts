import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  distinctUntilChanged,
  filter,
  from,
  mergeMap,
  pipe,
  tap
} from 'rxjs';
import { ProfileService } from './profie.service';
import { UserContact, UserContactKey } from '../types';


export type PendingChangeType = { prop: UserContactKey; value: unknown };
export type UserState = {
  id: string | undefined;

  version: number | undefined;
  contact: UserContact;

  isSavingContactKey: UserContactKey | undefined;
  pendingChange: PendingChangeType | undefined;
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

  isSavingContactKey: undefined,
  pendingChange: undefined,
};
export const UserProfileStore = signalStore(
  withState(initialState),
  withMethods(
    (
      { contact, pendingChange, ...state },
      changeProp = inject(ProfileService).changeProperty()
    ) => ({
      setUser(user: UserContact) {
        patchState(state, {
          contact: user,
        });
      },
      setUserState(key: UserContactKey, value: unknown) {
        if (contact()[key] === value) return;
        patchState(state, {
          isSavingContactKey: key,
          pendingChange: { prop: key, value },
        });
      },

      saveUserProp: rxMethod<PendingChangeType>(
        pipe(
          distinctUntilChanged(),
          takeUntilDestroyed(),

          filter((a) => {
            return a.prop !== undefined;
          }),
          mergeMap((original) =>
            from(
              changeProp.mutateAsync({
                key: original.prop,
                value: original.value,
              })
            ).pipe(
              tap(() => { // Todo: Need to switchmap or something off the changeProp.result$
                patchState(state, {
                  isSavingContactKey: undefined,
                  pendingChange: undefined,
                  contact: { ...contact(), [original.prop]: original.value },
                });
              })
            )
          )
        )
      ),
    })
  ),
  withComputed(({ contact, isSavingContactKey, pendingChange, ...state }) => ({
    firstNameIsValid: computed(() => firstNameValid(contact())),
    lastNameIsValid: computed(() => lastNameValid(contact())),
    contactChannelIsValid: computed(() => contactChannelIsValid(contact())),
    contactEmailIsValid: computed(() => emailValid(contact())),
    contactPhoneIsValid: computed(() => phoneValid(contact())),
    contactIsValid: computed(() => contactIsValid(contact())),
    contactInvalid: computed(() => !contactIsValid(contact())),
    isSavingContact: computed(
      () => isSavingContactKey() !== undefined && pendingChange() !== undefined
    ),
    streamId: computed(() => ''),
    changeRequest: computed(
      () =>
        ({
          prop: pendingChange()?.prop,
          value: pendingChange()?.value,
        } as PendingChangeType)
    ),
  })),
  withHooks({
    async onInit({ saveUserProp, changeRequest }) {
      saveUserProp(changeRequest);
    },
  })
);

function emailValid(contact: UserContact): boolean {
  if (contact.contactChannel === 'Email') {
    return contact.emailAddress.length > 0;
  }
  return true;
}
function phoneValid(contact: UserContact): boolean {
  if (contact.contactChannel === 'Phone') {
    return contact.phoneNumber.length > 0;
  }
  return true;
}

function firstNameValid(contact: UserContact) {
  return contact.firstName.length > 0;
}

function lastNameValid(contact: UserContact) {
  return contact.lastName.length > 0;
}
function contactChannelIsValid(contact: UserContact) {
  return contact.contactChannel !== 'GeneratedBySystem';
}
function contactIsValid(contact: UserContact) {
  return (
    firstNameValid(contact) &&
    lastNameValid(contact) &&
    contactChannelIsValid(contact) &&
    emailValid(contact) &&
    phoneValid(contact)
  );
}
