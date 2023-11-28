import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { UserIncidentDocuments } from "./actions";
import { UserDocuments } from "../../state/actions";


export type UserIncident = {
    id: string;
    description: string | undefined;
}
interface UserIncidentState extends EntityState<UserIncident> {};
const adapter = createEntityAdapter<UserIncident>();
const initialState = adapter.getInitialState();
export const UserIncidentFeature = createFeature({
    name: 'UserIncidentFeature',
    reducer: createReducer(initialState, 
        on(UserDocuments.user, (state, { payload }) => adapter.setAll(payload.userIncidents, state)),
        on(UserIncidentDocuments.created, (state, { payload }) => adapter.upsertOne(payload, state))),
        extraSelectors: ({ selectUserIncidentFeatureState }) => ({
            all: createSelector(selectUserIncidentFeatureState, (s) => adapter.getSelectors().selectAll(s)),
            getById: (id: string) => createSelector(selectUserIncidentFeatureState, state => state.entities[id])
        })
})