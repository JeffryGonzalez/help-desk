import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { secureApiInterceptor } from './auth/secure-api.interceptor';
import { AuthFeature } from './auth/state';
import * as authEffects from './auth/state/effects';
import { reducers } from './state';
import { UserIncidentFeature } from './user/incidents/state';
import * as userIncidentEffects from './user/incidents/state/effects';
import * as userContactEffects from './user/profile/state/effects';
import { UserContactFeature } from './user/profile/state';
import { UserFeature } from './user/state';
import * as userEffects from './user/state/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    // UserIncidentsStore,
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([secureApiInterceptor])),
    provideStore(reducers),
    provideState(AuthFeature),
    provideState(UserFeature),
    provideState(UserIncidentFeature),
    provideState(UserContactFeature),
    provideStoreDevtools(),
    provideEffects([authEffects, userEffects, userIncidentEffects, userContactEffects]),
  ],
};
