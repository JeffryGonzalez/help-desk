import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { secureApiInterceptor } from './auth/secure-api.interceptor';
import { provideQueryDevTools } from '@ngneat/query-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([secureApiInterceptor])),
    isDevMode() ? provideQueryDevTools() : [],
  ],
};
