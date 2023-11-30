import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { injectMutation, injectQuery, queryOptions } from '@ngneat/query';

import { UserContact } from '../types';

import { getApiUrl } from '@auth/index';
import { UserIdService } from '@auth/user-id.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();

  #mutation = injectMutation();
  private readonly userId = inject(UserIdService).getUserId();

  #getContactOptions = queryOptions({
    queryKey: ['contact'] as const,
    queryFn: () => {
      return this.#http.get<UserContact>(`${this.url}users/${this.userId}/contact`);
    },
  });
  
  getContact() {
    return this.#query(this.#getContactOptions);
  }

  changeProperty() {
    return this.#mutation({
      mutationFn: ({
        key,
        value,
      }: {
        key: keyof UserContact;
        value: unknown;
      }) => {
        return this.#http.put(
          `${this.url}users/${this.userId}/contact/${tToK(key)}`,
          { value }
        );
      },
    });
  }
}

function tToK(titleCase: string): string {
  return titleCase
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}