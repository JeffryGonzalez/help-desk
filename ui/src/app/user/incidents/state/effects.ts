import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import { UserIncident } from '.';
import { UserFeature } from '../../state';
import { UserIncidentCommands, UserIncidentDocuments } from './actions';



export const createIncident = createEffect(
  (actions$ = inject(Actions), client = inject(HttpClient), store = inject(Store)) =>
  actions$.pipe(
    ofType(UserIncidentCommands.create),
    withLatestFrom(store.select(UserFeature.selectId)),
    mergeMap(([, userId]) => client.post<UserIncident>(`/api/users/${userId}/incidents`, {}).pipe(
      map((payload) => UserIncidentDocuments.created({ payload }))
    ))
  ), { functional: true }
)


export const redirectOnCreate = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(UserIncidentDocuments.created),
      map(({ payload }) => router.navigate(['/user/incidents', payload.id]))
    );
  },
  { functional: true, dispatch: false }
);
