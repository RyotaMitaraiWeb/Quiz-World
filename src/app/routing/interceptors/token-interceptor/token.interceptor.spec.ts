import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler } from '@angular/common/http';

describe('TokenInterceptor', () => {
  let testController: HttpTestingController;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        }
      ],
      imports: [HttpClientTestingModule]
    });

    testController = TestBed.inject(HttpTestingController);
    
    http = TestBed.inject(HttpClient);
  });

  it('attaches the JWT from localStorage to the request', () => {
    localStorage.setItem('token', 'a');
    http.get('/test').subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = testController.expectOne('/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer a');
  });

  it('Does not attach the Authorization header if it cannot find a JWT in localStorage', () => {
    localStorage.removeItem('token');

    http.get('/test').subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = testController.expectOne('/test');
    expect(req.request.headers.get('Authorization')).toBeNull();
  });

  afterEach(() => {
    localStorage.clear();
    testController.verify();
  })
});
