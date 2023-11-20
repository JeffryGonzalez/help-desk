import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthDocuments } from "./actions";

export type AuthState = {
    isAuthenticated: boolean;
    sub: string | undefined;
}

const initialState:AuthState = {
    isAuthenticated: false,
    sub: undefined
}

export const authFeature = createFeature({
    name: 'authFeature',
    reducer: createReducer(initialState,
        on(AuthDocuments.user, (_,a) => a.payload )
        )
})

export function getApiUrl() {
  const backendHost = getCurrentHost();

  return `${backendHost}/api/`;
}

function getCurrentHost() {
  const host = window.location.host;
  const url = `${window.location.protocol}//${host}`;
  return url;
}
