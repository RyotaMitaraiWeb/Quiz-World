import { TestBed, waitForAsync } from '@angular/core/testing';

import { UnauthorizedRedirectInterceptor } from './unauthorized-redirect.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UnauthorizedRedirectInterceptor', () => {
  let router: Router;
  let http: HttpClient;
  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UnauthorizedRedirectInterceptor,
          multi: true,
        }
      ],
      imports: [HttpClientTestingModule],
    })

    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    testController = TestBed.inject(HttpTestingController);
  });

  it('Calls router and localStorage.removeItem if response is 401 and the request has not opted out of redirections', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    spyOn(localStorage, 'removeItem').and.stub();
    http.get('/test').subscribe({
      complete() {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        done();
      },
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.Unauthorized,
      statusText: 'Unauthorized',
    });
  });

  it('Does not call router and localStorage.removeItem if response is different from 401', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    spyOn(localStorage, 'removeItem').and.stub();

    http.get('/test').subscribe({
      complete() {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(localStorage.removeItem).not.toHaveBeenCalled();
        done();
      },
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.Ok,
      statusText: 'Ok',
    });
  });

  it('Does not call router and localStorage.removeItem if response is 401 and the request has opted out of redirections', (done: DoneFn) => {
    spyOn(router, 'navigate').and.stub();
    spyOn(localStorage, 'removeItem').and.stub();

    http.get('/test', {
      headers: {
        'Skip-Unauthorized-Redirection': 'true',
      }
    }).subscribe({
      complete() {
        expect(router.navigate).not.toHaveBeenCalled();
        expect(localStorage.removeItem).not.toHaveBeenCalled();
        done();
      },
    });

    const req = testController.expectOne('/test');

    req.flush(null, {
      status: HttpStatusCode.Unauthorized,
      statusText: 'Unauthorized',
    });
  });

  afterEach(() => {
    testController.verify();
  })
});
