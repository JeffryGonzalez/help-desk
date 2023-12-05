import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { getApiUrl } from "@auth/index";
import { injectQuery, injectQueryClient, queryOptions } from "@ngneat/query";
import { UserContact } from "app/features/user/features/profile/types";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();
  #client = injectQueryClient();

  #getContactOptions = (userId:string) => queryOptions({
    queryKey: ['user', userId],
    queryFn: () => {
      return this.#http.get<UserContact>(
        `${this.url}users/${userId}/contact`
      );
    },
  })

  getUser(id: string) {
    return this.#query(this.#getContactOptions(id));
  }
}