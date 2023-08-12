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

export const SkipNotFoundRedirection = 'Skip-Not-Found-Redirection';

@Injectable()
export class NotFoundRedirectInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router) {}

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
    if (!req.headers.has(SkipNotFoundRedirection) && status === HttpStatusCode.NotFound) {      
      this.router.navigate(['/not-found']);
    }
  }
}
