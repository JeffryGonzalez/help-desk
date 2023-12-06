import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { getApiUrl } from "@auth/index";
import { injectQueryClient, injectQuery, injectMutation, queryOptions } from "@ngneat/query";
import { UserIncident } from "../types";
import { map } from "rxjs";
import { UserMeta } from "@auth/auth.service";

@Injectable({ providedIn: 'root' })
export class IncidentsService {
  private readonly url = getApiUrl();
  #userMeta = injectQueryClient()
    .getQueryCache()
    .find<UserMeta>({ queryKey: ['user', 'meta'] });
  #http = inject(HttpClient);
  #query = injectQuery();
  #client = injectQueryClient();
  #mutation = injectMutation();
  #meta = this.#userMeta?.state.data as UserMeta;
  getIncidentsOptions = queryOptions({
    queryKey: ['user', 'incidents'] as const,
    queryFn: () => {
      return this.#http
        .get<{ incidents: UserIncident[] }>(
          `${this.url}users/${this.#meta.id}/incidents`
        )
        .pipe(map(({ incidents }) => incidents));
    },
    enabled: !!this.#meta,
  });
  getIncidentOptions = queryOptions({
    queryKey: ['user', 'incidents', 'id'] as const,
    queryFn: () => {
      return this.#http
        .get<{ incidents: UserIncident[] }>(
          `${this.url}users/${this.#meta.id}/incidents`
        )
        .pipe(map(({ incidents }) => incidents));
    },
    enabled: !!this.#meta,
  });

  create() {
    return this.#mutation({
      mutationFn: ({ description }: { description: string }) => {
        return this.#http.post<{ id: string; description: string }>(
          `${this.url}users/${this.#meta.id}/incidents`,
          { description }
        );
      },
      onSuccess: (newIncident) => {
        this.#client.setQueryData(
          ['user', 'incidents'],
          (old: UserIncident[]) => [...old, newIncident]
        );
        this.#client.setQueryData(
          ['user', 'incidents', newIncident.id],
          newIncident
        );
      },
    });
  }

  get() {
    return this.#query(this.getIncidentsOptions);
  }
}