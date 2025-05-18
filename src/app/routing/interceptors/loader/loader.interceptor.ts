import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private readonly loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.addRequest();
    return next.handle(request).pipe(
      finalize(() => this.loadingService.removeRequest())
    );
  }
}
