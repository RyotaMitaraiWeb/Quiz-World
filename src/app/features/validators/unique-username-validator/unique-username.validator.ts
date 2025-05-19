import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, debounce, debounceTime, distinctUntilChanged, map, of, tap } from 'rxjs';
import { AuthService } from '../../../core/auth-service/auth.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
/**
 * An injectable validator for checking if a particular username has already been taken by 
 * another user.
 * 
 * This validator's ``validate`` method sends a GET request to ``/auth/username/{username}``
 * (where ``{username}`` is the form control's value).
 * If the response status is 404, the validator returns ``null``, otherwise returns the
 * following object: ``{ uniqueUsername: string }``
 * 
 * The error message depends on whether the response status is 200 
 * (aka the username is taken) or not (indicator of a possible HTTP request failure).
 * 
 * The request is debounced by 1.5 seconds.
 */
@Injectable({
  providedIn: 'root',
})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private readonly authService: AuthService) { }
  validate(control: AbstractControl<string, string>): Observable<ValidationErrors | null> {
    const value = control.value;
    return this.authService.usernameExists(value)
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        map(res => res.status),
        map(this.determineIfValidByStatus),
        catchError((err: HttpErrorResponse) => of(this.determineIfValidByStatus(err.status)))
      );
  }

  private determineIfValidByStatus(status: number) {    
    if (status === HttpStatusCode.Ok) {
      return { uniqueUsername: 'This username is already taken!' };
    } else if (status === HttpStatusCode.NotFound) {
      return null;
    }

    return { uniqueUsername: 'Something went wrong! Please try again later!' };
  }
}