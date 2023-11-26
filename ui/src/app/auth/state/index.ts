import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from '@ngrx/store';

export type AuthState = {
    isAuthenticated: boolean;
    streamId: string | undefined;
}
const initialState: AuthState = {
  isAuthenticated: false,
  streamId: undefined,
};

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Check Auth': emptyProps(),
        'Logged In': props<{payload: AuthState}>(),
        'Logged Out': emptyProps()
    }
})
export const AuthFeature = createFeature({
    name: 'AuthFeature',
    reducer: createReducer(initialState,
        on(AuthActions.loggedIn, (state, {payload}) => ({...state, ...payload})),
        on(AuthActions.loggedOut, () => initialState)
    )
})

