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
import { Observable, catchError, filter, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { interceptorHeaders } from '../../../constants/interceptor-headers.constants';

@Injectable()
export class ForbiddenRedirectInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        filter(event => event instanceof HttpResponse),
        catchError((err: HttpResponse<any>) => {          
          this.redirectOnError(request, err.status);          
          return throwError(() => new HttpErrorResponse({
            status: err.status,
            statusText: err.statusText,
          }));
        })
      );
  }

  private redirectOnError(req: HttpRequest<unknown>, status: number) {    
    if (!req.headers.has(interceptorHeaders.SkipForbiddenRedirection) && status === HttpStatusCode.Forbidden) {      
      this.router.navigate(['']);
    }
  }
}
