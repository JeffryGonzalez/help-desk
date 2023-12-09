import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "./auth.service";


export function getApiUrl() {
  const backendHost = getCurrentHost();

  return `${backendHost}/api/`;
}

export function getCurrentHost() {
  const host = window.location.host;
  const url = `${window.location.protocol}//${host}`;
  return url;
}

export function loggedInGuard(): CanActivateFn {
  return () => {
    const store = inject(AuthService);
    return store.checkAuth().result$.pipe(map((x) => !!x));
  };
}