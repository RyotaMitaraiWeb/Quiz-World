import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, filter, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { invalidActionsMessages } from '../../../constants/invalidActionsMessages.constants';

@Injectable()
export class RequestFailedSnackbarInterceptor implements HttpInterceptor {

  constructor(
    private readonly snackbar: MatSnackBar,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        filter(event => event instanceof HttpResponse),
        catchError((err: HttpResponse<any>) => {          
          if (err.status >= 500 || err.status === 0) {
            this.snackbar.open(invalidActionsMessages.requestFailed, 'Got it');
          }

          return throwError(() => new HttpErrorResponse({
            status: err.status,
            statusText: err.statusText,
          }));
        })
      );
  }
}
