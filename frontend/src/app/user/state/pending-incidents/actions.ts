import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PendingUserIncident, PendingUserIncidentSteps } from ".";
import { UserContact } from "..";


export type UserPendingIncidentEdit = Omit<PendingUserIncident, 'id'>;

export const PendingUserIncidentCommands = createActionGroup({
  source: 'Pending User Incident Commands',
  events: {
    'Create New Incident': emptyProps(),
    'Set Current Incident': props<{ payload: string }>(),
    'Update Incident': props<{
      payload: {
        id: string;
        changes: Partial<UserPendingIncidentEdit>;
      };
    }>(),
    'Update Incident Contact Info': props<{
      payload: {
        id: string;
        changes: Partial<UserContact>;
      };
    }>(),
    'Go To Step': props<{
      payload: {
        step: PendingUserIncidentSteps;
        id: string;
      };
    }>(),
    'Check For Incident': props<{ payload: string }>(),
  },
});

export const PendingUserIncidentDocuments = createActionGroup({
  source: 'Pending User Incident Documents',
  events: {
    'New Inicident': props<{ payload: PendingUserIncident }>(),
    'Set Inicident': props<{ payload: PendingUserIncident }>(),
  },
});
