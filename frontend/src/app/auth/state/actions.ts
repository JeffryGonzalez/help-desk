import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AuthState } from ".";


export const AuthCommands = createActionGroup({
    source: 'Auth Commands',
    events: {
        'Check Auth': emptyProps(),
        'Log In': emptyProps(),
        'Log Out': emptyProps(),
    }
});

export const AuthDocuments = createActionGroup({
  source: 'Auth Documents',
  events: {
    User: props<{ payload: AuthState }>(),
  },
});

export const AuthEvents = createActionGroup({
  source: 'Auth Events',
  events: {
    'User Logged In': emptyProps(),
    'User Logged Out': emptyProps(),
  },
});