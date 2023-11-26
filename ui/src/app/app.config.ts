import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { secureApiInterceptor } from './auth/secure-api.interceptor';
import * as authEffects from './auth/state/effects'
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthFeature } from './auth/state';
import { reducers } from './state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([secureApiInterceptor])),
    provideStore(reducers),
    provideState(AuthFeature),
    provideStoreDevtools(),
    provideEffects(authEffects)
  ],
};
