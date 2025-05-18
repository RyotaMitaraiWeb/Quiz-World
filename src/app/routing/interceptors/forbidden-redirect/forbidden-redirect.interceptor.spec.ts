import { TestBed, waitForAsync } from '@angular/core/testing';

import { ForbiddenRedirectInterceptor } from './forbidden-redirect.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { interceptorHeaders } from '../../../constants/interceptor-headers.constants';

describe('ForbiddenRedirectInterceptor', () => {
  let router: Router;
  let http: HttpClient;
  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ForbiddenRedirectInterceptor,
          multi: true,
        }
      ],
      imports: [HttpClientTestingModule],
    })

    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    testController = TestBed.inject(HttpTestingController);
  });

  it('Calls router if response is 403 and the request has not opted out of redirections', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    http.get('/test').subscribe({
      error: (err) => {
        expect(router.navigate).toHaveBeenCalled();
        done();
      }
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.Forbidden,
      statusText: 'Forbidden',
    });
  });

  it('Does not call router and localStorage.removeItem if response is different from 401', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    spyOn(localStorage, 'removeItem').and.stub();

    http.get('/test').subscribe({
      next: (err) => {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(localStorage.removeItem).not.toHaveBeenCalled();
        done();
      }
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.Ok,
      statusText: 'Ok',
    });
  });

  it('Does not call router and localStorage.removeItem if response is 403 and the request has opted out of redirections', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();

    http.get('/test', {
      headers: {
        [interceptorHeaders.SkipForbiddenRedirection]: 'true',
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
      status: HttpStatusCode.Forbidden,
      statusText: 'Forbidden',
    });
  });

  afterEach(() => {
    testController.verify();
  })
});