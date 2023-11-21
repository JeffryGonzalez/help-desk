import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, switchMap, tap } from 'rxjs';
import { UserState } from '.';
import { authFeature, getApiUrl } from '../../auth/state';
import { AuthEvents } from '../../auth/state/actions';
import { UserContactCommands, UserDocuments } from './actions';

@Injectable()
export class UserEffects {
  private readonly url = getApiUrl();

  getUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthEvents.userLoggedIn),
        concatLatestFrom(() => this.store.select(authFeature.selectStreamId)),
        map(([_, streamId]) => streamId),
        switchMap((streamId) =>
          this.http
            .get<UserState>(this.url + `users/${streamId}`)
            .pipe(map((payload) => UserDocuments.user({ payload })))
        )
      ),
    { dispatch: true }
  );

  updateUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserContactCommands.updateItem),
        concatLatestFrom(() => this.store.select(authFeature.selectStreamId)),
        map(([action, streamId]) => ({ ...action, streamId })),
        tap((a) => {
          const path = this.camelToKebab(a.payload.operation);
          const url = this.url + `users/${a.streamId}/${path}`;
          const body = { value: a.payload.value[a.payload.operation] };
          console.log(url, body);
        })
      ),
    {
      dispatch: false,
    }
  );
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly store: Store
  ) {}

  camelToKebab(path: string) {
    // convert path to kebab-case
    return path.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}
