import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, switchMap, timer } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { registerValidationRules } from "../../common/validationRules/register";

export function uniqueUsernameValidatorAsync(): AsyncValidatorFn {
  const authService = inject(AuthService);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(registerValidationRules.username.UNIQUE_USERNAME_TIMEOUT).pipe(
      switchMap(() => authService.checkIfUsernameExists(control.value)),
      map(exists => exists ? { uniqueUsername: true } : null)
    );
  }
}