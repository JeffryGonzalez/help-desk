import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { secureApiInterceptor } from './interceptors/secure-api.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { reducers } from './state';
import { authFeature } from './auth/state';
import { AuthEffects } from './auth/state/effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([secureApiInterceptor])),
    provideStore(reducers),
    provideState(authFeature),
    isDevMode() ? provideStoreDevtools() : [],
    provideEffects([AuthEffects])
  ],
};
