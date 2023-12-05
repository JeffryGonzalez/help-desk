import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { getApiUrl } from "@auth/index";
import { QueryClient, injectMutation, injectQuery, injectQueryClient, queryOptions } from "@ngneat/query";
import { ProfileService } from "app/features/user/features/profile/services";
import { UserContact } from "app/features/user/features/profile/types";

type UnassignedIncidentsState = {
    id: string;
    description:string;
    customerId: string;
    created: string;
    customerInfo: UserContact | undefined;
}
@Injectable({ providedIn: 'root' })
export class UnassignedIncidentsService {
  private readonly url = getApiUrl();
  #someId = injectQueryClient()
    .getQueryCache()
    .find({ queryKey: ['user', 'id'] });
  #http = inject(HttpClient);
 #client = injectQueryClient();
  #query = injectQuery();

  #streamId = this.#someId?.state.data;
  #mutation = injectMutation();
  #getUnassignedIncidents = queryOptions({
    queryKey: ['user', 'tech', 'unassigned-incidents'] as const,
    queryFn: () => {
      return this.#http
        .get<UnassignedIncidentsState[]>(
          `${this.url}techs/unassigned-incidents`
        )
       
    },
    enabled: !!this.#streamId,
  });


  get() {
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

}