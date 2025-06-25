import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../store/user/user.store';

export const loggedInGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const isLoggedIn = userStore.isLoggedIn();
  if (isLoggedIn) return true;

  return router.parseUrl('/auth/login');
};
