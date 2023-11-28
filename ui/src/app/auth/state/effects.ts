import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from ".";
import { AuthService } from "../auth.service";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router, RouterState, RouterStateSnapshot } from "@angular/router";


export const checkAuth = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.checkAuth),
      mergeMap(() =>
        service.checkAuth().pipe(
          map((payload) => AuthActions.loggedIn({ payload })),
          catchError(() => of(AuthActions.loggedOut()))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);

export const redirectOnLogin = createEffect(
  (actions$ = inject(Actions), router = inject(Router), ) => {
    return actions$.pipe(
      ofType(AuthActions.loggedIn),
      map(() => router.routerState.snapshot.url === "/" ? "/user" : router.routerState.snapshot.url),
      tap(path => console.log(path)),
      tap((path) => router.navigate(['user', 'incidents']))
    );
  },
  { functional: true, dispatch: false }
);