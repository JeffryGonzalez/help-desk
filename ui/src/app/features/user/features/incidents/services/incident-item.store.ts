import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserIncident } from '../types';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, filter, from, mergeMap, pipe, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StagedUserIncidentsService } from './staged-incident.service';

type PendingChangeType = { prop: keyof UserIncident; value: string };
type UserIncidentState = {
  incident: UserIncident;
  pendingChange: PendingChangeType | undefined;
  isSavingDescription: boolean;
};
const initialState: UserIncidentState = {
  incident: {
    description: '',
    created: '',
    id: '',
  },
  isSavingDescription: false,
  pendingChange: undefined,
};
export const IncidentItemStore = signalStore(
  withState(initialState),
  withMethods(
    (
      state,
      changeProp = inject(StagedUserIncidentsService).changeDescription()
    ) => ({
      setIncident(incident: UserIncident) {
        patchState(state, {
          incident: {...incident, description: incident.description || ''}
        });
      },
      changeDescription(description: string) {
        if (state.incident().description === description) return;

        patchState(state, {
          isSavingDescription: true,
          pendingChange: { prop: 'description', value: description },
        });
      },
      saveUserProp: rxMethod<PendingChangeType>(
        pipe(
          distinctUntilChanged(),
          takeUntilDestroyed(),
          filter((change) => change.prop !== undefined),
          mergeMap((original) =>
            from(
              changeProp.mutateAsync({
                id: state.incident().id,
                description: original.value,
              })
            ).pipe(
              tap(() => {
                patchState(state, {
                  pendingChange: undefined,
                    isSavingDescription: false,
                  incident: {
                    ...state.incident(),
                    description: original.value,
                  },
                });
              })
            )
          )
        )
      ),
    })
  ),
  withComputed(({ incident, pendingChange }) => ({
    incident: computed(() => incident),
    created: computed(() => incident().created),
    description: computed(() => incident().description),
    isValid: computed(() => incident().description.length > 0),
    isInvalid: computed(() => incident().description.length === 0),
    changeRequest: computed(
      () =>
        ({
          prop: pendingChange()?.prop,
          value: pendingChange()?.value,
        } as PendingChangeType)
    ),
  })),
  withHooks({
    async onInit({ saveUserProp, changeRequest }) {
      console.log('init', changeRequest());
      saveUserProp(changeRequest);
    },
  })
);
