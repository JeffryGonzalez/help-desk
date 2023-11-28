import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { UserIncident } from "./state";
import { computed } from "@angular/core";


const initialState: UserIncident = {
    id: '',
    description: '',
}

export const UserIncidentItemStore = signalStore(
withState(initialState),
withMethods(({...state}) => ({
    setId(id: string) {
        patchState(state, {id})
    },
    setDescription(description: string) {
        patchState(state, {description})
    }
})), 
withComputed(({id, description}) => ({
    ready: computed(() => id() !== '' && description() !== ''),
    incident: computed(() => ({id: id(), description: description()}))
}))
);