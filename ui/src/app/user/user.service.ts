import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery, injectQueryClient, queryOptions } from '@ngneat/query';
import { getApiUrl } from '../auth';
import { AuthService } from '../auth/auth.service';
import { UserState } from './state';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();
  #client = injectQueryClient();
  private readonly id = inject(AuthService).checkAuth().result;
  #getUsersOptions = queryOptions({
    queryKey: ['user'] as const,
    queryFn: () => {
      return this.#http.get<UserState>(`${this.url}users/${this.id().data}`);
    },
  });
  getUser() {
    return this.#query(this.#getUsersOptions);
  }
  getContact() {
    const user = this.#client.getQueryData(this.#getUsersOptions.queryKey);
    if (user) {
      return user.contact;
    } else {
      return null;
    }
  }
}
