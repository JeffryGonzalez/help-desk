import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { UserContact } from "..";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { PendingUserIncidentCommands, PendingUserIncidentDocuments } from "./actions";

export type PendingUserIncidentSteps = 'start' | 'description' | 'contact' | 'review' | 'complete';
export type PendingUserIncident = {
    id: string | undefined;
    description: string | undefined;
    contact: UserContact | undefined;
  
}

export interface PendingUserIncidentState extends EntityState<PendingUserIncident> {
  current: string | undefined;
  step: PendingUserIncidentSteps;
  completedSteps: PendingUserIncidentSteps[];
}
  

const adapter = createEntityAdapter<PendingUserIncident>();

const initialState: PendingUserIncidentState = adapter.getInitialState({
    current: undefined,
      step: 'start',
    completedSteps: []

});

export const pendingUserIncidentFeature = createFeature({
  name: 'pendingUserIncidentFeature',
  reducer: createReducer(
    initialState,
    on(PendingUserIncidentCommands.updateIncident, (state, { payload }) =>
      adapter.updateOne(payload, state)
    ),
    on(PendingUserIncidentDocuments.newInicident, (state, { payload }) =>
      adapter.addOne(payload, state)
    ),
    on(PendingUserIncidentDocuments.newInicident, (state, { payload }) => ({
      ...state,
      current: payload.id,
      step: 'description' as unknown as PendingUserIncidentSteps,
      completedSteps: ['description'] as unknown as PendingUserIncidentSteps[]
    })),
    on(PendingUserIncidentCommands.goToStep, (state, { payload }) => {

      if (state.completedSteps.includes(payload.step)) {
        return {...state, step: payload.step};
      } else {
        return {...state, step: payload.step, completedSteps: [...state.completedSteps, payload.step]};
      }
      
    })
  ),
  extraSelectors: ({ selectCurrent, selectEntities, selectIds }) => ({
    selectCurrentIssue: createSelector(selectCurrent, selectEntities, (current, entities) => current ? entities[current] : undefined),
    selectIfIssueExists: (id: string) => createSelector(selectIds, (entities) => {
      
      const result = entities.filter(e => e === id).length > 0;
      return result;
    }),
  })
});

