import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { getApiUrl } from '@auth/index';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
  queryOptions,
} from '@ngneat/query';
import { UserIncident } from '../types';

@Injectable({ providedIn: 'root' })
export class StagedUserIncidentsService {
  private readonly url = getApiUrl();
  #someId = injectQueryClient()
    .getQueryCache()
    .find({ queryKey: ['user', 'id'] });
  #http = inject(HttpClient);
  #query = injectQuery();
  #client = injectQueryClient();
  #mutation = injectMutation();
  #streamId = this.#someId?.state.data;
  #getContactOptions = queryOptions({
    queryKey: ['user', 'staged-incidents'] as const,
    queryFn: () => {
      return this.#http.get<UserIncident[]>(
        `${this.url}users/${this.#streamId}/staged-incidents`
      );
    },
    enabled: !!this.#streamId,
  });

  getStagedIncidents() {
    return this.#query(this.#getContactOptions);
  }

  getStagedIncident(id: string) {
    const incidents = this.#client.getQueryData(
      this.#getContactOptions.queryKey
    );

    if (incidents) {
      return incidents.find((i) => i.id === id);
    }
    return null;
  }

  create() {
    return this.#mutation({
      mutationFn: (variables = {}) => {
        return this.#http.post<UserIncident>(
          `${this.url}users/${this.#streamId}/staged-incidents`,
          variables
        );
      },
      onSuccess: (newIncident) => {
        this.#client.setQueryData(
          ['user', 'staged-incidents'],
          (old: UserIncident[]) => [...old, newIncident]
        );
      },
    });
  }

  changeDescription() {
    return this.#mutation({
      mutationFn: ({
        id,
        description,
      }: {
        id: string;
        description: string;
      }) => {
        return this.#http.put(
          `${this.url}users/${this.#streamId}/staged-incidents/${id}/description`,
          { value: description }
        );
      },
    });
  }
  // delete

  remove() {
    return this.#mutation({
      mutationFn: ({ id }: { id: string }) => {
        return this.#http.delete(
          `${this.url}users/${this.#streamId}/staged-incidents/${id}`
        );
      },
      onSuccess: (_, variables) => {
        this.#client.setQueryData(
          ['user', 'staged-incidents'],
          (old: UserIncident[]) => old.filter((i) => i.id !== variables.id)
        );
      },
    });
  }
}
