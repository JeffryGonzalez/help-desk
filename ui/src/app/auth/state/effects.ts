import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from ".";
import { AuthService } from "../auth.service";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";


export const checkAuth = createEffect(
    (actions$ = inject(Actions), service = inject(AuthService)) => {
        return actions$.pipe(
            ofType(AuthActions.checkAuth),
            mergeMap(() => service.checkAuth()
                .pipe(
                    map((payload) => AuthActions.loggedIn({ payload })),
                    catchError(() => of(AuthActions.loggedOut()))
                )
            )
        )
}, { functional: true, dispatch: true})

export const redirectOnLogin = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.loggedIn),
      tap(() => router.navigate(['/user']))
      
    );
  },
  { functional: true, dispatch: false }
);