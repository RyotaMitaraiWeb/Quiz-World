import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../store/user/user.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION, snackbarAction, snackbarMessages } from '../../common/snackbar';

export const loggedInGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  const isLoggedIn = userStore.isLoggedIn();
  if (isLoggedIn) return true;

  snackbar.open(snackbarMessages.error.login, snackbarAction, {
    duration: SNACKBAR_DURATION,
  });

  return router.parseUrl('/auth/login');
};
