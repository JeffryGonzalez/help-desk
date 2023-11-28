import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from '@ngrx/store';

export type AuthState = {
    isAuthenticated: boolean;
   
}
const initialState: AuthState = {
  isAuthenticated: false,
};

export type StreamId = string;
export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Check Auth': emptyProps(),
        'Logged In': props<{payload: StreamId}>(),
        'Logged Out': emptyProps()
    }
})
export const AuthFeature = createFeature({
    name: 'AuthFeature',
    reducer: createReducer(initialState,
        on(AuthActions.loggedIn, (state, {payload}) => ({...state, streamId: payload, isAuthenticated: true})),
        on(AuthActions.loggedOut, () => initialState)
    )
})

