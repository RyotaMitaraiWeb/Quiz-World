import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { IAuthBody } from '../../../types/auth/general.types';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { IAuthSuccessResponse } from '../../../types/responses/auth.types';

describe('AuthService', () => {
  let service: AuthService;
  const body: IAuthBody = {
    username: 'a',
    password: 'a',
  };

  const response: IAuthSuccessResponse = {
    token: 'a',
    id: 1,
    username: 'a',
    roles: [],
  }

  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    testController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('Correctly handles a successful response', (done: DoneFn) => {
      const res = service.login(body);
      res.subscribe({
        next: res => {
          expect(res.status).toBe(HttpStatusCode.Created);
          const user = res.body!;
          expect(user.id).toBe(1);
          expect(user.token).toBe('a');
          expect(user.username).toBe('a');
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        }
      });

      const request = testController.expectOne(service.url.login);
      request.flush(response, {
        status: HttpStatusCode.Created,
        statusText: 'Created',
      });
    });

    it('Correctly handles an error response', (done: DoneFn) => {
      const res = service.login(body);
      res.subscribe({
        next: res => {
          done.fail('Expected an error response, not a successful one')
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.Unauthorized);
          const errors = err.error;
          expect(errors.message).toEqual(['error']);
          done();
        }
      });

      const errorResponse = new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });

      const request = testController.expectOne(service.url.login);
      request.flush({
        message: ['error']
      }, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });
    });
  });

  describe('register', () => {
    it('Correctly handles a successful response', (done: DoneFn) => {
      const res = service.register(body);
      res.subscribe({
        next: res => {
          expect(res.status).toBe(HttpStatusCode.Created);
          const user = res.body!;
          expect(user.id).toBe(1);
          expect(user.token).toBe('a');
          expect(user.username).toBe('a');
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        }
      });

      const request = testController.expectOne(service.url.register);
      request.flush(response, {
        status: HttpStatusCode.Created,
        statusText: 'Created',
      });
    });

    it('Correctly handles an error response', (done: DoneFn) => {
      const res = service.register(body);
      res.subscribe({
        next: res => {
          done.fail('Expected an error response, not a successful one')
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.Unauthorized);
          const errors = err.error;
          expect(errors.message).toEqual(['error']);
          done();
        }
      });

      const errorResponse = new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });

      const request = testController.expectOne(service.url.register);
      request.flush({
        message: ['error']
      }, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });
    });
  });

  describe('logout', () => {
    it('Correctly handles a successful response', (done: DoneFn) => {
      const res = service.logout();
      res.subscribe({
        next: res => {
          expect(res.status).toBe(HttpStatusCode.NoContent);
          done();
        },
        error: err => {
          done.fail('Expected a successs response, not an error one');
          console.warn(err);
        }
      });

      const request = testController.expectOne(service.url.logout);
      request.flush(null, {
        status: HttpStatusCode.NoContent,
        statusText: 'No Content',
      });
    });

    it('Correctly handles an error response', (done: DoneFn) => {
      const res = service.logout();
      res.subscribe({
        next: res => {
          done.fail('Expected an error response, not a successful one');
          console.warn(res);
        },
        error: err => {
          expect(err.status).toBe(HttpStatusCode.Unauthorized);
          done();
        }
      });

      const request = testController.expectOne(service.url.logout);
      request.flush(null, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });
    });
  });

  describe('usernameExists', () => {
    it('Correctly handles a successful response', (done: DoneFn) => {
      const res = service.usernameExists('a');
      res.subscribe({
        next: res => {
          expect(res.status).toBe(HttpStatusCode.Ok);
          done();
        },
        error: err => {
          done.fail('Expected a successs response, not an error one');
          console.warn(err);
        }
      });

      const request = testController.expectOne(service.url.usernameExists('a'));
      request.flush(null, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly handles an error response', (done: DoneFn) => {
      const res = service.usernameExists('a');
      res.subscribe({
        next: res => {
          done.fail('Expected an error response, not a successful one');
          console.warn(res);
        },
        error: err => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          done();
        }
      });

      const request = testController.expectOne(service.url.usernameExists('a'));
      request.flush(null, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });
  });

  describe('logout', () => {
    it('Correctly handles a successful response', (done: DoneFn) => {
      const res = service.logout();
      res.subscribe({
        next: res => {
          expect(res.status).toBe(HttpStatusCode.NoContent);
          done();
        },
        error: err => {
          done.fail('Expected a successs response, not an error one');
          console.warn(err);
        }
      });

      const request = testController.expectOne(service.url.logout);
      request.flush(null, {
        status: HttpStatusCode.NoContent,
        statusText: 'No Content',
      });
    });

    it('Correctly handles an error response', (done: DoneFn) => {
      const res = service.logout();
      res.subscribe({
        next: res => {
          done.fail('Expected an error response, not a successful one');
          console.warn(res);
        },
        error: err => {
          expect(err.status).toBe(HttpStatusCode.Unauthorized);
          done();
        }
      });

      const request = testController.expectOne(service.url.logout);
      request.flush(null, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });
    });
  });

  describe('retrieveSession', () => {
    it('Correctly handles a successful response', (done: DoneFn) => {
      const res = service.retrieveSession();
      res.subscribe({
        next: res => {
          expect(res.status).toBe(HttpStatusCode.Created);
          const user = res.body!;
          expect(user.id).toBe(1);
          expect(user.token).toBe('a');
          expect(user.username).toBe('a');
          done();
        },
        error: err => {
          done.fail('Expected a successful response, not an error one');
          console.warn(err);
        }
      });

      const request = testController.expectOne(service.url.session);
      request.flush(response, {
        status: HttpStatusCode.Created,
        statusText: 'Created',
      });
    });

    it('Correctly handles an error response', (done: DoneFn) => {
      const res = service.retrieveSession();
      res.subscribe({
        next: res => {
          done.fail('Expected an error response, not a successful one')
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.Unauthorized);
          const errors = err.error;
          expect(errors.message).toEqual(['error']);
          done();
        }
      });

      const errorResponse = new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });

      const request = testController.expectOne(service.url.session);
      request.flush({
        message: ['error']
      }, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });
    });
  });

  afterEach(() => {
    testController.verify();
  });
});
