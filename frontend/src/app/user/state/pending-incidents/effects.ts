import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { PendingUserIncidentCommands, PendingUserIncidentDocuments } from "./actions";
import { EMPTY, map, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { pendingUserIncidentFeature } from ".";
import { userFeature } from "..";

@Injectable()
export class PendingUserIncidentEffects {
  createNewIncident = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingUserIncidentCommands.createNewIncident),
      concatLatestFrom(() => this.store.select(userFeature.selectContactChannel)),

      map(([_, user]) =>
        PendingUserIncidentDocuments.newInicident({
          payload: {
            id: crypto.randomUUID(),
            description: undefined,
            contact: {
              contactChannel: user?.contactChannel,
              firstName: user?.firstName || '',
              lastName: user?.lastName || '',
              emailAddress: user?.emailAddress || '',
              phoneNumber: user?.phoneNumber || '',
            },
          },
        })
      ),
      tap((e) =>
        this.router.navigate(['create-incident', e.payload.id, 'description'])
      )
    )
  );

  setCurrentIncident = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PendingUserIncidentCommands.setCurrentIncident),
        concatLatestFrom((_) =>
          this.store.select(
            pendingUserIncidentFeature.selectPendingUserIncidentFeatureState
          )
        ),
        map(([action, state]) => {
          const incident = state.entities[action.payload];
          if (!incident) {
            this.router.navigate(['']);
            return { type: 'NOOP ' };
          } else {
            return PendingUserIncidentDocuments.setInicident({
              payload: incident,
            });
          }
        })
      ),
    { dispatch: true }
  );

  navigateToStep = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PendingUserIncidentCommands.goToStep),
        concatLatestFrom((_) =>
          this.store.select(pendingUserIncidentFeature.selectCurrentIssue)
        ),
        tap(([action, state]) => {
          if (!state) {
            this.router.navigate(['create-incident']);
          } else {
            console.log(state.id, action.payload.step);
            this.router.navigate([
              'create-incident',
              state.id,
              action.payload.step,
            ]);
          }
        })
      ),
    { dispatch: false }
  );

  checkEachTime = createEffect(() => this.actions$.pipe(
    ofType(PendingUserIncidentCommands.goToStep),
    map((a) => PendingUserIncidentCommands.checkForIncident({ payload: a.payload.id })
  )));
  checkForIncident = createEffect(() =>
    this.actions$.pipe(
      ofType(PendingUserIncidentCommands.checkForIncident),
      tap((a) => console.log(a.payload)),
      concatLatestFrom((a) =>
        this.store.select(pendingUserIncidentFeature.selectIfIssueExists(a.payload))
      ),
      map(([action, state]) => {
        if(state) {
          return PendingUserIncidentCommands.setCurrentIncident({ payload: action.payload });
        } else {
          this.router.navigate(['']);
          return { type: 'NOOP' };
        }
      })
    )
  );
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly store: Store
  ) {}
}