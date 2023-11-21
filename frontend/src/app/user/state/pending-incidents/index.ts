import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { UserContact } from "..";
import { createFeature, createReducer, on } from "@ngrx/store";
import { PendingUserIncidentCommands, PendingUserIncidentDocuments } from "./actions";

export type PendingUserIncident = {
    id: string | undefined;
    description: string | undefined;
    contact: UserContact | undefined;
}

export interface PendingUserIncidentState extends EntityState<PendingUserIncident> { 
    current: PendingUserIncident | undefined;
}

const adapter = createEntityAdapter<PendingUserIncident>();

const initialState: PendingUserIncidentState = adapter.getInitialState({
    current: undefined
});

export const pendingUserIncidentFeature = createFeature({
    name: 'pendingUserIncidentFeature',
    reducer: createReducer(initialState,
        on(PendingUserIncidentCommands.updateIncident, (state, { payload }) => adapter.updateOne(payload, state)),
        on(PendingUserIncidentDocuments.newInicident, (state, { payload }) => adapter.addOne(payload, state)),
        on(PendingUserIncidentDocuments.newInicident, (state, { payload }) => ({ ...state, current: payload }))
    
    )   
});

