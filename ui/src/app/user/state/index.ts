import { createFeature, createReducer, on } from "@ngrx/store";
import { UserIncident } from "../incidents/state";
import { UserContact } from "../profile/state";
import { UserDocuments } from "./actions";

export type UserState = {
    id: string | undefined;
    version: number | undefined;
    contact: UserContact | undefined;
    userIncidents: UserIncident[]
};

const initialState: Omit<UserState, 'contact' | 'userIncidents'> = {
    id: undefined,
    version: undefined,
    
};

export const UserFeature = createFeature({
    name: 'UserFeature',
    reducer: createReducer(initialState,
        on(UserDocuments.user, (state, { payload }) => ({ ...state, id: payload.id, version: payload.version})),
        )
})