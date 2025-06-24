import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { SNACKBAR_DURATION, snackbarAction, snackbarErrorMessages } from '../../common/snackbar';

export const notifyOnServerErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);
  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const statusCode = error.status;
        if (statusCode === 0 || statusCode >= 500) {
          snackbar.open(snackbarErrorMessages.error.requestFailed, snackbarAction, {
            duration: SNACKBAR_DURATION,
          });
        }

        return throwError(() => error);
      }),
    );
};
