import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, HttpStatusCode, provideHttpClient, withInterceptors } from '@angular/common/http';

import { notifyOnServerErrorInterceptor } from './notify-on-server-error.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('notifyOnServerErrorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => notifyOnServerErrorInterceptor(req, next));

  let httpTest: HttpTestingController;
  let httpClient: HttpClient;
  let snackbar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([interceptor])), provideHttpClientTesting()],
    });

    snackbar = TestBed.inject(MatSnackBar);

    httpTest = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Displays snackbar if response status code is >= 500', () => {
    const spy = spyOn(snackbar, 'open').and.stub();

    httpClient.get('/test').subscribe({ error() {
      expect(spy).toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null, { status: HttpStatusCode.InternalServerError, statusText: 'Internal Server Error' });
  });

  it('Displays snackbar if response status code is 0', () => {
    const spy = spyOn(snackbar, 'open').and.stub();

    httpClient.get('/test').subscribe({ error() {
      expect(spy).toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null, { status: 0, statusText: 'Zero' });
  });

  it('Does not display a snackbar if response status code is a non-500+ error', () => {
    const spy = spyOn(snackbar, 'open').and.stub();

    httpClient.get('/test').subscribe({ error() {
      expect(spy).not.toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null, { status: HttpStatusCode.BadRequest, statusText: 'Bad Request' });
  });

  it('Does not display a snackbar if response status code is a success one', () => {
    const spy = spyOn(snackbar, 'open').and.stub();

    httpClient.get('/test').subscribe({ next() {
      expect(spy).not.toHaveBeenCalled();
    }});

    const request = httpTest.expectOne('/test');
    request.flush(null, { status: HttpStatusCode.Ok, statusText: 'Ok' });
  });

  afterEach(() => {
    httpTest.verify();
  });
});
