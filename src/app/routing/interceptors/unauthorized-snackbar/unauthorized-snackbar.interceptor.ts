import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, filter, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkipUnauthorizedRedirectionHeader } from '../unauthorized-redirect/unauthorized-redirect.interceptor';
import { invalidActionsMessages } from '../../../constants/invalidActionsMessages.constants';

@Injectable()
export class UnauthorizedSnackbarInterceptor implements HttpInterceptor {

  constructor(
    private readonly snackbar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        filter(event => event instanceof HttpResponse),
        catchError((err: HttpResponse<any>) => {
          if (err.status === HttpStatusCode.Unauthorized && !request.headers.has(SkipUnauthorizedRedirectionHeader)) {
            this.snackbar.open(invalidActionsMessages.login, 'Got it');
          }
          return throwError(() => new HttpErrorResponse({
            status: err.status,
            statusText: err.statusText,
          }));
        })
      );
  }
}