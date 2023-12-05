import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { injectMutation, injectQuery, injectQueryClient, queryOptions } from '@ngneat/query';

import { UserContact } from '../types';

import { getApiUrl } from '@auth/index';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();
  #someId = injectQueryClient()
    .getQueryCache()
    .find({ queryKey: ['user', 'id'] });
  #mutation = injectMutation();
  #streamId = this.#someId?.state.data;

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
    const id = this.#streamId as unknown as string;
    return this.#query(this.#getContactOptions(id));
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
          `${this.url}users/${this.#streamId}/contact/${tToK(key)}`,
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