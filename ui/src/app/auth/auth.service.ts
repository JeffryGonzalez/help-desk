import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { getApiUrl } from ".";

import { AuthState } from "./state";
export type UserClaim = { type: string; value: string };
@Injectable({ providedIn: 'root'})
export class AuthService {
    private readonly url = getApiUrl();
    checkAuth() {
        return this.client.get<UserClaim[]>(`${this.url}user`)
        .pipe(
            map((claims) => {
                 const sub = claims.find((x) => x.type === 'sub')?.value;
                 const streamId = claims.find(
                   (x) => x.type === 'stream_id'
                 )?.value;
                 
                
                 return streamId!;
            })
        )
    }

    constructor(private readonly client: HttpClient) {}
}