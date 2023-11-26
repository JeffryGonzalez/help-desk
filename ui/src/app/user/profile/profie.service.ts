import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { PendingChangeType, UserState } from './user.store';
import { lastValueFrom, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../../auth/state';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  store = inject(Store);
  id = this.store.selectSignal(AuthFeature.selectStreamId);
  constructor(private readonly client: HttpClient) {}

  loadUser() {
    
    return this.client.get<UserState>('/api/users/' + this.id());
  }

  updateUserContactInfo(id: string, change: PendingChangeType) {
    if(id === undefined || change === undefined) {
      return of(undefined) as any;
    }
    const path = tToK(change.prop);
    const update = {value: change.value};
    return this.client.put('/api/users/' + id + '/' + path, update);
  }
}

function tToK(titleCase: string): string {
  return titleCase
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}