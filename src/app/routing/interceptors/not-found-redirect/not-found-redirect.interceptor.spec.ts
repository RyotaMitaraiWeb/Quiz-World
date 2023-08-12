import { TestBed, waitForAsync } from '@angular/core/testing';

import {  NotFoundRedirectInterceptor } from './not-found-redirect.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { interceptorHeaders } from '../../../constants/interceptor-headers.constants';

describe('NotFoundRedirectInterceptor', () => {
  let router: Router;
  let http: HttpClient;
  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NotFoundRedirectInterceptor,
          multi: true,
        }
      ],
      imports: [HttpClientTestingModule],
    })

    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    testController = TestBed.inject(HttpTestingController);
  });

  it('Calls router if response is 404 and the request has not opted out of redirections', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    http.get('/test').subscribe({
      error: (err) => {
        expect(router.navigate).toHaveBeenCalled();
        done();
      }
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.NotFound,
      statusText: 'Not Found',
    });
  });

  it('Does not call router if response is different from 404', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();

    http.get('/test').subscribe({
      next: (err) => {
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      }
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.Ok,
      statusText: 'Ok',
    });
  });

  it('Does not call router if response is 404 and the request has opted out of redirections', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();

    http.get('/test', {
      headers: {
        [interceptorHeaders.SkipNotFoundRedirection]: 'true',
      }
    })
    .subscribe({
      error: (err) => {        
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      }
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.NotFound,
      statusText: 'Not Found',
    });
  });

  afterEach(() => {
    testController.verify();
  })
});