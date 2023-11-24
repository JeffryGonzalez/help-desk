import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthState, AuthStore } from '../../auth/auth.store';
import { PendingChangeType, UserState } from './profile.store';
import { lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly client: HttpClient) {}

  loadUser(id: string) {
    return lastValueFrom(this.client.get<UserState>('/api/users/' + id));
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