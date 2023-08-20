import { TestBed, waitForAsync } from '@angular/core/testing';

import { RequestFailedInterceptor } from './request-failed.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RequestFailedRedirectInterceptor', () => {
  let router: Router;
  let http: HttpClient;
  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestFailedInterceptor,
          multi: true,
        }
      ],
      imports: [HttpClientTestingModule],
    })

    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    testController = TestBed.inject(HttpTestingController);
  });

  it('Calls router if response is >= 500', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    http.get('/test').subscribe({
      error: (err) => {
        expect(router.navigate).toHaveBeenCalled();
        done();
      }
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal server error',
    });
  });


  it('Calls router if response is 0', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    http.get('/test').subscribe({
      error: (err) => {
        expect(router.navigate).toHaveBeenCalled();
        done();
      }
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: 0,
      statusText: 'Connection failed',
    });
  });

  it('Does not call router if response is not in range', (done: DoneFn) => {
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

  afterEach(() => {
    testController.verify();
  })
});