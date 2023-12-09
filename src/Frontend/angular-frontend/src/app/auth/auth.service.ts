import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { injectQuery } from '@ngneat/query';
import { map } from "rxjs";
import { getApiUrl } from ".";
export type UserClaim = { type: string; value: string };
export type UserMeta = {
  id: string;
  isTech: boolean;
};
@Injectable({ providedIn: 'root' })


export class AuthService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();

  checkAuth() {
    
    return this.#query({
        queryKey: ['user', 'meta'] as const,
        retry: (count, error) => {
          const e = error as unknown as {status: number};
          if(e?.status === 401)  {return false;}
          return count > 3 ? false : true;
        },
        queryFn: () => this.getUser()
        
    }
    )
  }

  isTech() {
    return this.#query({queryKey: ['user', 'meta', 'isTech'] as const, retry: false, queryFn: () => this.getUser(), select: (user) => user?.isTech})
  }

  private getUser() {
    return this.#http.get<UserClaim[]>(`${this.url}user`).pipe(
          map((claims) => {
            const streamId = claims.find((x) => x.type === 'stream_id')?.value;
            const isTech = claims.some((x) => x.type === 'roles' && x.value === 'tech');
            return { id: streamId, isTech: isTech} as UserMeta
          })
    )
}
}

