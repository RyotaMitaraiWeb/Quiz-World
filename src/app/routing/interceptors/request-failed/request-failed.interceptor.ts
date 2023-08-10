import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, filter, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RequestFailedInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        filter(event => event instanceof HttpResponse),
        catchError((err: HttpResponse<any>) => {          
          if (err.status >= 500 || err.status === 0) {
            this.router.navigate(['']);
          }

          return throwError(() => new HttpErrorResponse({
            status: err.status,
            statusText: err.statusText,
          }));
        })
      );
  }
}
