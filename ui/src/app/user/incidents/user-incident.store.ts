import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

import { UserIncident } from "./state";


 type UserIncidentState =  {
    incidents: UserIncident[];

}

const initialState: UserIncidentState = {
    incidents: [],
}

export const UserIncidentsStore = signalStore(
    withState(initialState),
    withMethods(({incidents, ...state}) => ({
       add(payload: UserIncident) {
           
           return patchState(state, { incidents: [...incidents(), payload]});
       }
    })
    )
)