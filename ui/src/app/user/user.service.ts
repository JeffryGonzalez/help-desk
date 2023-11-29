import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { getApiUrl } from "../auth";
import { injectQuery } from "@ngneat/query";
import { UserState } from "./state";
import { AuthService } from "../auth/auth.service";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();
private readonly id = inject(AuthService).checkAuth().result;
  getUser() {
    return this.#query({
      queryKey: ['user'] as const,
      queryFn: () => this.#http.get<UserState>(`${this.url}users/${this.id().data}`)
    })
  }

}