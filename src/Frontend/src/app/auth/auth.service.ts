import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { injectQuery } from '@ngneat/query';
import { map } from "rxjs";
import { getApiUrl } from ".";
export type UserClaim = { type: string; value: string };
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = getApiUrl();
  #http = inject(HttpClient);
  #query = injectQuery();

  checkAuth() {
    
    return this.#query({
        queryKey: ['user', 'id'] as const,
        retry: (count, error) => {
          const e = error as unknown as {status: number};
          if(e?.status === 401)  {return false;}
          return count > 3 ? false : true;
        },
        queryFn: () => this.#http.get<UserClaim[]>(`${this.url}user`).pipe(
          map((claims) => {
            const streamId = claims.find((x) => x.type === 'stream_id')?.value;
            return streamId;
          })
        )
    }
    )
  }
}

