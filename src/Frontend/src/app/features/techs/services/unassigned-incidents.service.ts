import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { UserMeta } from "@auth/auth.service";
import { getApiUrl } from "@auth/index";
import { injectMutation, injectQuery, injectQueryClient, queryOptions } from "@ngneat/query";
import { UserContact } from "app/features/user/features/profile/types";

export type UnassignedIncidentsState = {
    id: string;
    version: number;
    description:string;
    customerId: string;
    created: string;
    customerInfo: UserContact | undefined;
}
@Injectable({ providedIn: 'root' })
export class UnassignedIncidentsService {
  private readonly url = getApiUrl();
  meta = injectQueryClient()
    .getQueryCache()
    .find<UserMeta>({ queryKey: ['user', 'meta'] });
  #http = inject(HttpClient);
 #client = injectQueryClient();
  #query = injectQuery();

  #streamId = this.meta?.state.data as UserMeta;
  #mutation = injectMutation();
  #getUnassignedIncidents = queryOptions({
    queryKey: ['user', 'tech', 'unassigned-incidents'] as const,
    queryFn: () => {
      return this.#http
        .get<UnassignedIncidentsState[]>(
          `${this.url}techs/unassigned-incidents`
        )
       
    },
    enabled: !!this.#streamId?.id && this.#streamId?.isTech,
  });


  get() {
    console.log(this.#streamId)
    return this.#query(this.#getUnassignedIncidents);
  }

  getContactForIncident() {
    return this.#mutation({
      mutationFn: ({userId}:{userId: string}) => {
        return this.#http.get<UserContact>(`${this.url}users/${userId}/contact`)
      },
      onSuccess: (newContact, variables) => {
       return this.#client.setQueryData(['user', 'tech', 'unassigned-incidents'], (old:UnassignedIncidentsState[]) =>  {
          return old.map((incident) => {
            if (incident.customerId === variables.userId) {
              return {
                ...incident,
                customerInfo: newContact,
              }
            }
            return incident
          })
        })
      }
    })
  }

  assign() {
    return this.#mutation({
      mutationFn: ({incident}:{incident: UnassignedIncidentsState}) => {
        return this.#http.put(`${this.url}techs/${this.#streamId.id}/incidents/${incident.id}`, {id: incident.id, version: incident.version})
      },
      onSuccess: () => {
        this.#client.invalidateQueries({queryKey: ['user', 'tech', 'unassigned-incidents']});
      }
    })
  }
}