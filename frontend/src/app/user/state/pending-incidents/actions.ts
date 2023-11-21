import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PendingUserIncident } from ".";


export type UserPendingIncidentEdit = Omit<PendingUserIncident, 'id'>;

export const PendingUserIncidentCommands = createActionGroup({
    source: 'Pending User Incident Commands',
    events: {
        'Create New Incident': emptyProps(),
        'Set Current Incident': props<{ payload: string }>(),
        'Update Incident': props<{ payload: {
            id: string;
            changes: Partial<UserPendingIncidentEdit> }
        }>(),
    }
})

export const PendingUserIncidentDocuments = createActionGroup({
  source: 'Pending User Incident Documents',
  events: {
    'New Inicident': props<{ payload: PendingUserIncident }>(),
    'Set Inicident': props<{ payload: PendingUserIncident }>(),
  },
});
