import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
export type AuthState = {
  isAuthenticated: boolean;
  sub?: string;
  streamId?: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  sub: undefined,
  streamId: undefined,
};

export const AuthStore = signalStore(
  withState(initialState),
  withMethods(({...state}, authService = inject(AuthService)) => ({
    logIn() {
          window.location.href = '/api/login';
    },
    logOut() {
          window.location.href = '/api/logout';
    },
    checkAuth: rxMethod<boolean>(
        pipe(
            switchMap(() => authService.checkAuth()
                .pipe(
                    tap((authState) =>  patchState(state, authState)
                )
            ),
        )
    )
    )
  })),
  withHooks({
    onInit({ checkAuth})  {
        console.log('onInit');
        checkAuth(true);
    }
  })
);
