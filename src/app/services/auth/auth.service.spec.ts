import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpTest = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkIfUsernameExists', () => {
    it('Returns true if the username does exist', (done: DoneFn) => {
      const username = 'a';

      service.checkIfUsernameExists(username).subscribe(v => {
        expect(v).toBeTrue();
        done();
      });

      const request = httpTest.expectOne(service.url.usernameExists(username));
      request.flush(null, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok'
      });

    });

    it('Returns false if the username does not exist', (done: DoneFn) => {
      const username = 'a';

      service.checkIfUsernameExists(username).subscribe(v => {
        expect(v).toBeFalse();
        done();
      });
      
      const request = httpTest.expectOne(service.url.usernameExists(username));
      request.flush(null, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not found'
      });

    });
  });

  afterEach(() => {
    httpTest.verify();
  })
});
