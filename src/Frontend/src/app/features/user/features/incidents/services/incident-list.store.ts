import {
    patchState,
    signalStore,
    type,
    withComputed,
    withMethods,
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { UserIncident } from '../types';


export const IncidentListStore = signalStore(
  withEntities({ entity: type<UserIncident>(), collection: 'incident' }),
  withMethods((state) => ({
    setIncidents(incidents: UserIncident[]) {
      patchState(state, addEntities(incidents, { collection: 'incident' }));
    },
  })),
  withComputed((state) => ({
    
  }))
);
