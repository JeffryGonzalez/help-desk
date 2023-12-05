import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { injectMutation, injectQuery, injectQueryClient, queryOptions } from '@ngneat/query';

import { UserContact } from '../types';

import { getApiUrl } from '@auth/index';
import { UserMeta } from '@auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();
  userMeta = injectQueryClient()
    .getQueryCache()
    .find<UserMeta>({ queryKey: ['user', 'meta'] });
  #mutation = injectMutation();
  #streamId = this.userMeta?.state.data as UserMeta;

  #getContactOptions = (userId:string) => queryOptions({
    queryKey: ['user', 'contact'] as const,
    queryFn: () => {
      return this.#http.get<UserContact>(
        `${this.url}users/${userId}/contact`
      );
    },
   enabled: !!this.#streamId
  });

  getContact() {
    const id = this.#streamId
    return this.#query(this.#getContactOptions(id.id));
  }
  getContactForUser(id: string) {
    return this.#query(this.#getContactOptions(id));
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
          `${this.url}users/${this.#streamId.id}/contact/${tToK(key)}`,
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