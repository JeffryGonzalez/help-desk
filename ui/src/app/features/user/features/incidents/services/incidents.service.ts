import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { getApiUrl } from "@auth/index";
import { injectQueryClient, injectQuery, injectMutation, queryOptions } from "@ngneat/query";
import { UserIncident } from "../types";

@Injectable({ providedIn: 'root' })
export class IncidentsService {
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
    queryKey: ['user', 'incidents'] as const,
    queryFn: () => {
      return this.#http.get<UserIncident[]>(
        `${this.url}users/${this.#streamId}/incidents`
      );
    },
    enabled: !!this.#streamId,
  });

  create() {
    return this.#mutation({
        mutationFn: ({id}:{id: string}) => {
            return this.#http.post<{id: string}>(
                `${this.url}users/${this.#streamId}/incidents`,
                {id}
            );
        }
    })
  }
}