import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpInterceptorFn, HttpStatusCode, provideHttpClient, withInterceptors } from '@angular/common/http';

import { redirectOnErrorInterceptor, skipRedirectOnResponseHeader } from './redirect-on-error.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('redirectOnErrorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => redirectOnErrorInterceptor(req, next));

  let httpTest: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([interceptor])), provideHttpClientTesting()],
    });

    router = TestBed.inject(Router);

    httpTest = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Redirects if response has a valid status code', () => {
    const spy = spyOn(router, 'navigateByUrl').and.stub();

    httpClient.get('/test').subscribe({ error() {
      expect(spy).toHaveBeenCalledWith('/auth/login');
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null, { status: HttpStatusCode.Unauthorized, statusText: 'Unauthorized' });
  });

  it('Does not redirect if response has an excluding header that matches the response (single excluded status code)', () => {
    const spy = spyOn(router, 'navigateByUrl').and.stub();
    const headers = new HttpHeaders(skipRedirectOnResponseHeader(HttpStatusCode.Unauthorized));

    httpClient.get('/test', { headers }).subscribe({ error() {
      expect(spy).not.toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null,
      {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      },
    );
  });

  it('Does not redirect if response has an excluding header that matches the response (multiple excluded status codes)', () => {
    const spy = spyOn(router, 'navigateByUrl').and.stub();
    const headers = new HttpHeaders(skipRedirectOnResponseHeader(HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden));

    httpClient.get('/test', { headers }).subscribe({ error() {
      expect(spy).not.toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null,
      {
        status: HttpStatusCode.Forbidden,
        statusText: 'Forbidden',
      },
    );
  });

  it('Does not redirect if response status code is not one of the possible options', () => {
    const spy = spyOn(router, 'navigateByUrl').and.stub();

    httpClient.get('/test').subscribe({ error() {
      expect(spy).not.toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null,
      {
        status: HttpStatusCode.ImATeapot,
        statusText: 'I\'m a teapot',
      },
    );
  });

  it('Does not redirect if response is not an error one', () => {
    const spy = spyOn(router, 'navigateByUrl').and.stub();

    httpClient.get('/test').subscribe({ next() {
      expect(spy).not.toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null,
      {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      },
    );
  });

  afterEach(() => {
    httpTest.verify();
  });
});
