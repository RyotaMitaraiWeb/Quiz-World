import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';

import { loggedInGuard } from './logged-in.guard';
import { UserStore } from '../../store/user/user.store';
import { roles } from '../../common/roles';

describe('loggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => loggedInGuard(...guardParameters));

  const route = {} as ActivatedRouteSnapshot;
  const routerState = {} as RouterStateSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', async () => {
    expect(executeGuard).toBeTruthy();
  });

  it('returns true if the user is logged in', async () => {
    const store = TestBed.inject(UserStore);
    store.updateUser({
      id: '1',
      username: 'a',
      roles: [roles.user],
    });

    const result = await executeGuard(route, routerState);

    expect(result).toBeTrue();
  });

  it('returns UrlTree if the user is logged in', async () => {
    const result = await executeGuard(route, routerState);

    expect(result).toBeInstanceOf(UrlTree);
  });
});
