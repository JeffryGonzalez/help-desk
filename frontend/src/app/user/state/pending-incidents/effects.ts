import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { PendingUserIncidentCommands, PendingUserIncidentDocuments } from "./actions";
import { EMPTY, map, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { pendingUserIncidentFeature } from ".";

@Injectable()
export class PendingUserIncidentEffects {

    createNewIncident = createEffect(() => this.actions$.pipe(
        ofType(PendingUserIncidentCommands.createNewIncident),
        map(() => PendingUserIncidentDocuments.newInicident({ payload: { id: crypto.randomUUID(), description: undefined, contact: undefined } })),
        tap((e) => this.router.navigate(['create-incident', e.payload.id, 'description']))
    ))

    setCurrentIncident = createEffect(() => this.actions$.pipe(
        ofType(PendingUserIncidentCommands.setCurrentIncident),
        concatLatestFrom( _ =>this.store.select(pendingUserIncidentFeature.selectPendingUserIncidentFeatureState) ),
        map(([action, state]) => {
            const incident = state.entities[action.payload];
            if(!incident) {
              
            
                this.router.navigate(['create-incident']);
                return {type: 'NOOP '};
            } else {
                return PendingUserIncidentDocuments.setInicident({ payload: incident });
            }
            
        })
    ), { dispatch: true })
    constructor(private readonly actions$: Actions, private readonly router:Router, private readonly store:Store) { }

}