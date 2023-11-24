import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { getApiUrl } from '.';

// Adapted from https://github.com/damienbod/bff-aspnetcore-angular/blob/main/ui/src/app/secure-api.interceptor.ts

export function secureApiInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const secureRoutes = [getApiUrl()];

  if (!secureRoutes.find((x) => request.url.startsWith(x))) {
    return next(request);
  }

  request = request.clone({
    // this is required by Duende.BFF to add the CSRF token to the request
    headers: request.headers.set('X-CSRF', '1'),
  });

  return next(request);
}
