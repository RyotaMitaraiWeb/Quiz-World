import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

const statusCodePaths: Record<number, string> = {
  [HttpStatusCode.Unauthorized]: '/auth/login',
  [HttpStatusCode.Forbidden]: '/',
  [HttpStatusCode.NotFound]: '/not-found',
};

export const skipRedirectHeaderName = 'X-Ignore-Error-Codes';

export function skipRedirectOnResponseHeader(...statusCodes: HttpStatusCode[]): Record<string, number[]> {
  const header = {
    [skipRedirectHeaderName]: statusCodes,
  };

  return header;
}

export const redirectOnErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const reqWithoutHeader = req.clone({
    headers: req.headers.delete(skipRedirectHeaderName),
  });

  return next(reqWithoutHeader)
  .pipe(
    catchError((res: HttpErrorResponse) => {
      const statusCode = res.status;
      const path = statusCodePaths[statusCode] as string | undefined;
      const skip = shouldBeSkipped(res, req);

      if (!skip && path) {
        router.navigateByUrl(path);
      }

      return throwError(() => res);
    }),
  );
};

function shouldBeSkipped(res: HttpErrorResponse, req: HttpRequest<unknown>): boolean {
  const ignoredStatusCodes = req.headers.getAll(skipRedirectHeaderName)?.map(Number) || [];
  return ignoredStatusCodes.includes(res.status);
}
