import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AuthActions } from "../../auth/state";
import { map, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserState } from ".";
import { UserDocuments } from "./actions";



export const loadUserReadModel = createEffect(
    (actions$ = inject(Actions),
    store = inject(Store),
    client = inject(HttpClient)) => actions$.pipe(
        ofType(AuthActions.loggedIn),
        switchMap((u) => client.get<UserState>('/api/users/' + u.payload).pipe(
            map((payload) => UserDocuments.user({ payload }))
    )) )
, { functional: true, dispatch: true})