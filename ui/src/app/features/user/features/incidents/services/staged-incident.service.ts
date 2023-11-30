import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { getApiUrl } from '@auth/index';
import { UserIdService } from '@auth/user-id.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
  queryOptions,
} from '@ngneat/query';
import { UserIncident } from '../types';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StagedUserIncidentsService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();
  #client = injectQueryClient();
  #mutation = injectMutation();
  #router = inject(Router);
  private readonly userId = inject(UserIdService).getUserId();
  #getContactOptions = queryOptions({
    queryKey: ['user', 'staged-incidents'] as const,
    queryFn: () => {
      return this.#http
        .get<{ incidents: UserIncident[] }>(
          `${this.url}users/${this.userId}/staged-incidents`
        )
        .pipe(map(({ incidents }) => ({ incidents })));
    },
  });

  getStagedIncidents() {
    return this.#query(this.#getContactOptions);
  }

  getStagedIncident(id: string) {
    const incidents = this.#client.getQueryData(
      this.#getContactOptions.queryKey
    );

    if (incidents) {
      return incidents.incidents.find((i) => i.id === id);
    }
    return null;
  }

  create() {
    return this.#mutation({
      mutationFn: (variables = {}) => {
        return this.#http.post<UserIncident>(
          `${this.url}users/${this.userId}/staged-incidents`,
          variables
        );
      },
      onSuccess(data, variables, context) {
          
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
          `${this.url}users/${this.userId}/staged-incidents/${id}`,
          { description }
        );
      },
    });
  }
  // delete

  remove() {
    return this.#mutation({
        mutationFn: ({id}:{id:string}) => {
            return this.#http.delete(`${this.url}users/${this.userId}/staged-incidents/${id}`)  
        },
        onSuccess:(_, { id}) => {
           console.log(id);
           let data = this.#client.getQueryData(this.#getContactOptions.queryKey);
           if(data) {
            if(data?.incidents.length !== 0) {
                data = {...data, incidents: data.incidents.filter(i => i.id !==id)};
                console.log(data);
                this.#client.setQueryData(this.#getContactOptions.queryKey, data);
            }
        }
        }
    })
  }
}
