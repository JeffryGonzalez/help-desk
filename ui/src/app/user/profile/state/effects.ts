import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { UserContactCommands } from "./actions";
import { mergeMap, withLatestFrom } from "rxjs";
import { UserFeature } from "../../state";

export const saveContactProp = createEffect((
    actions$ = inject(Actions),
    client = inject(HttpClient),
    store = inject(Store)) => actions$.pipe(
        ofType(UserContactCommands.updateProperty),
        withLatestFrom(store.select(UserFeature.selectId)),
        mergeMap(([{ payload }, userId]) => client.put(`/api/users/${userId}/${tToK(payload.prop)}`, {value: payload.value}).pipe(
         
        ))
    )
, { functional: true, dispatch: false})


function tToK(titleCase: string): string {
  return titleCase
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}