import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getApiUrl } from ".";
import { catchError, map, of } from "rxjs";
import { AuthState } from "./auth.store";
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
                 const payload:AuthState = {
                    isAuthenticated: true,
                    sub,
                    streamId,
                 };
                 return payload;
            }),
            catchError(() => {
                const payload: AuthState = {
                    isAuthenticated: false,
                };
                return of(payload);
            })
        )
    }

    constructor(private readonly client: HttpClient) {}
}