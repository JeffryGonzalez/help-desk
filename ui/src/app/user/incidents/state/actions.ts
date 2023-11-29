import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserIncident } from ".";


export const UserIncidentCommands = createActionGroup({
    source: 'User Incident Commands',
    events: {
        'Create': emptyProps(),
        'Update Description': props<{payload: { id: string, description: string}}>(),
        'Delete': props<{payload: { id: string}}>()
     
    }
})

export const UserIncidentDocuments = createActionGroup({
    source: 'User Incident Documents',
    events: {
        'Created': props<{payload: UserIncident}>(),
        'Incidents': props<{payload: UserIncident[]}>(),
        'Updated': props<{id: string, changes: Partial<UserIncident>}>(),
        'Deleted': props<{id: string}>()
    }
});