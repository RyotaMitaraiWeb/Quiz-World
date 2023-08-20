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
import { interceptorHeaders } from '../../../constants/interceptor-headers.constants';
import { invalidActionsMessages } from '../../../constants/invalidActionsMessages.constants';
import { SnackbarService } from '../../../core/snackbar/snackbar.service';

@Injectable()
export class UnauthorizedSnackbarInterceptor implements HttpInterceptor {

  constructor(
    private readonly snackbar: SnackbarService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        filter(event => event instanceof HttpResponse),
        catchError((err: HttpResponse<any>) => {
          if (err.status === HttpStatusCode.Unauthorized && !request.headers.has(interceptorHeaders.SkipUnauthorizedRedirection)) {
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
