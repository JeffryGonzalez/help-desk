import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { UserIncident } from "./state";
import { computed, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserIncidentCommands } from "./state/actions";


const initialState: UserIncident = {
    id: '',
    description: '',
    created: ''
}

export const UserIncidentItemStore = signalStore(
withState(initialState),
withMethods(({...state}, store = inject(Store)) => ({
    setId(id: string) {
        patchState(state, {id})
    },
    setIncident(incident: UserIncident) {
        patchState(state, incident)
    },
    setDescription(description: string) {
        store.dispatch(UserIncidentCommands.updateDescription({ payload: { id: state.id(), description } }));
       patchState(state, {description})
    }
})), 
withComputed(({id, description, created}) => ({
    ready: computed(() =>  description() !== ''),
    incident: computed(() => ({id: id(), description: description(), created: created()}))
}))
);