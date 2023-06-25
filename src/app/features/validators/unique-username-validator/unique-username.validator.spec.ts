import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../../core/auth-service/auth.service';
import { UniqueUsernameValidator } from './unique-username.validator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';

describe('UniqueUsernameValidator', () => {
  let validator: UniqueUsernameValidator;
  let authService: AuthService;
  let form: AbstractControl;
  let fb = new FormBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    validator = TestBed.inject(UniqueUsernameValidator);
    authService = TestBed.inject(AuthService);
    form = fb.control('');
  });

  it('should be created', () => {
    expect(validator).toBeTruthy();
  });

  it('Returns a validation error when auth service returns a status code of 200', (done: DoneFn) => {
    spyOn(authService, 'usernameExists').and.returnValue(new Observable(o => {
      o.next(new HttpResponse({
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      }))
    }));

    form.setValue('a');
    
    const result = validator.validate(form);
    result.subscribe({
      next: res => {
        console.log(res);
        
        expect(res).not.toBeNull();
        expect(res).toEqual({ uniqueUsername: 'This username is already taken!' });
        
        done();
      },
      error: err => {
        done.fail('Expected a successful response, not an error one');
        console.warn(err);
      },
    });
  });

  it('Returns null when auth service returns a status code of 404', (done: DoneFn) => {
    spyOn(authService, 'usernameExists').and.returnValue(new Observable(o => {
      o.error(new HttpResponse({
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      }))
    }));

    form.setValue('a');
    
    const result = validator.validate(form);
    result.subscribe({
      next: res => {        
        expect(res).toBeNull();
        done();
      },
      error: (err) => {
        console.warn(err);
        done.fail(err);
      },
    });
  });

  it('Returns a special message if server responds with any other status code', (done: DoneFn) => {
    spyOn(authService, 'usernameExists').and.returnValue(throwError(() => {
      return new HttpErrorResponse({
        status: HttpStatusCode.ServiceUnavailable,
        statusText: 'Service Unavailable',
      });
    }));

    form.setValue('a');
    
    const result = validator.validate(form);
    result.subscribe({
      next: res => {
        expect(res).toEqual({ uniqueUsername: 'Something went wrong! Please try again later!' })
        done();
      },
      error: err => {
        done.fail(err);
        console.warn(err);
      },
    });
  });
});