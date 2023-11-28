import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserIncident } from ".";


export const UserIncidentCommands = createActionGroup({
    source: 'User Incident Commands',
    events: {
        'Create': emptyProps(),
     
    }
})

export const UserIncidentDocuments = createActionGroup({
    source: 'User Incident Documents',
    events: {
        'Created': props<{payload: UserIncident}>(),
        'Incidents': props<{payload: UserIncident[]}>(),
    }
});