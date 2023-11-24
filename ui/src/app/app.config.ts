import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { secureApiInterceptor } from './auth/secure-api.interceptor';
import { AuthStore } from './auth/auth.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([secureApiInterceptor])),
    AuthStore,
  ],
};
