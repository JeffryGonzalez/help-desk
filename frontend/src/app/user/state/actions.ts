import { createActionGroup, props } from '@ngrx/store';
import { ContactChannels, UserContact, UserState } from '.';

export const UserDocuments = createActionGroup({
  source: 'User Documents',
  events: {
    User: props<{ payload: UserState }>(),
  },
});

export type UserContactEdit = Omit<UserContact, 'contactChannel'>;
type UserContactEditItem =  {
    payload: {
        operation: keyof UserContactEdit;
        value: Partial<UserContactEdit>;
    }
}
export const UserContactCommands = createActionGroup({
    source: 'User Contact Commands',
    events: {
        'Update Item': props<UserContactEditItem>(),
    }
})