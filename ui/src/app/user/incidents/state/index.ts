import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { UserIncidentDocuments } from "./actions";
import { UserDocuments } from "../../state/actions";


export type UserIncident = {
    id: string;
    description: string;
    created: string;
}
interface UserIncidentState extends EntityState<UserIncident> {};
const adapter = createEntityAdapter<UserIncident>();
const initialState = adapter.getInitialState();
export const UserIncidentFeature = createFeature({
    name: 'UserIncidentFeature',
    reducer: createReducer(initialState, 
        on(UserDocuments.user, (state, { payload }) => adapter.setAll(payload.userIncidents, state)),
        on(UserIncidentDocuments.deleted, (state, { id }) => adapter.removeOne(id, state)),
        on(UserIncidentDocuments.created, (state, { payload }) => adapter.upsertOne(payload, state)),
        on(UserIncidentDocuments.updated, (state, a) => adapter.updateOne({id: a.id, changes: a.changes}, state))
    ),
        extraSelectors: ({ selectEntities, selectIds }) => ({
            all:createSelector(selectIds, selectEntities, (ids, entities) => ids.map(id => entities[id])),
            
            getById: (id: string) => createSelector(selectEntities, state => state[id])
        })
})