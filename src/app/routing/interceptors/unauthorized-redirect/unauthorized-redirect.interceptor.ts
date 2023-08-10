import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpStatusCode,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, filter, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const SkipUnauthorizedRedirectionHeader = 'Skip-Unauthorized-Redirection'; 

/**
 * This interceptor will redirect the user to the login page if a 
 * request returns a 401 response and delete their ``token`` in the ``localStorage``.
 * To opt out of this behavior, attach a ``Skip-Unauthorized-Redirection`` header 
 * to the request (the value itself doesn't matter, the interceptor only looks for 
 * the presence of the header). An exported constant with the header string 
 * is available from the same file as the interceptor class.
 */
@Injectable()
export class UnauthorizedRedirectInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router
  ) { }

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
    if (!req.headers.has(SkipUnauthorizedRedirectionHeader) && status === HttpStatusCode.Unauthorized) {      
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
    }
  }
}
