import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { getApiUrl } from "@auth/index";
import { injectQueryClient, injectQuery, injectMutation, queryOptions } from "@ngneat/query";
import { UserIncident } from "../types";
import { map } from "rxjs";

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
      return this.#http.get<{incidents: UserIncident[]}>(
        `${this.url}users/${this.#streamId}/incidents`
      ).pipe(map(({incidents}) => incidents))
    },
    enabled: !!this.#streamId,
  });

  create() {
    return this.#mutation({
        mutationFn: ({description}:{description: string}) => {
            return this.#http.post<{id: string, description: string}>(
                `${this.url}users/${this.#streamId}/incidents`,
                {description}
            );
        },
        onSuccess: (newIncident) => {
          this.#client.setQueryData(['user','incidents'], (old: UserIncident[]) => [...old, newIncident])
        }
    },
  
    )
  }

  get() {
    return this.#query(this.#getContactOptions);
  }
}