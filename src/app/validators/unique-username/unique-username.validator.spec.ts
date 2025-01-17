import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { uniqueUsernameValidatorAsync } from './unique-username.validator';
import { Observable, of } from 'rxjs';

describe('uniqueUsernameValidatorAsync', () => {
  let authService: AuthService;
  let httpTest: HttpTestingController;
  let validate: AsyncValidatorFn;
  let validator: AsyncValidatorFn;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), uniqueUsernameValidatorAsync]
    });
    authService = TestBed.inject(AuthService);
    httpTest = TestBed.inject(HttpTestingController);

    validator = TestBed.inject(uniqueUsernameValidatorAsync);
  });

  it('should be created', () => {
    expect(validator).toBeTruthy();
  });

  it('returns null if the username does not exist', (done: DoneFn) => {
    spyOn(authService, 'checkIfUsernameExists').and.returnValue(of(false));
    const control = new FormControl('admin');
    const result = validator(control) as Observable<ValidationErrors | null>;

    result.subscribe(v => {
      expect(v).toBeNull();
      done();
    });
  });

  it('returns a validation error if the username does exist', (done: DoneFn) => {
    spyOn(authService, 'checkIfUsernameExists').and.returnValue(of(true));
    const control = new FormControl('admin');
    const result = validator(control) as Observable<ValidationErrors | null>;

    result.subscribe(v => {
      expect(v).not.toBeNull();
      expect(v?.['uniqueUsername']).toBeTrue();
      done();
    });
  });
});
