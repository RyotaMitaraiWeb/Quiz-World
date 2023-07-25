import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterState, RouterStateSnapshot } from '@angular/router';

import { canEditQuizGuard } from './can-edit-quiz.guard';
import { IAppStore } from '../../../../types/store/store.types';
import { Store } from '@ngrx/store';
import { RoleService } from '../../../core/role-service/role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppStoreModule } from '../../../store/app-store.module';
import { roles } from '../../../constants/roles.constants';
import { Observable, of } from 'rxjs';
import { setUser } from '../../../store/user/user.action';

describe('canEditQuizGuard', () => {
  let store: Store<IAppStore>;
  let roleService: RoleService;

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canEditQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, AppStoreModule],
    });

    store = TestBed.inject(Store);
    roleService = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('Unit tests', () => {
    it('Returns true if role service authorizes the user as a moderator', () => {
      spyOn(roleService, 'isModerator').and.returnValue(true);

      const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBe(true);
    });

    it('Returns an observable that resolves to true if the store returns an id that matches the creator', (done: DoneFn) => {
      spyOn(roleService, 'isModerator').and.returnValue(false);

      spyOn(store, 'select').and.returnValue(of('1'));

      const activatedRoute = new ActivatedRouteSnapshot();
      activatedRoute.data = { quiz: { creatorId: '1' }};

      const result = executeGuard(activatedRoute, {} as RouterStateSnapshot) as Observable<boolean>;
      result.subscribe(res => {
        expect(res).toBe(true);
        done();
      });
    });

    it('Returns an observable that resolves to false if the store returns an id that does not match the creator', (done: DoneFn) => {
      spyOn(roleService, 'isModerator').and.returnValue(false);

      spyOn(store, 'select').and.returnValue(of('1'));

      const activatedRoute = new ActivatedRouteSnapshot();
      activatedRoute.data = { quiz: { creatorId: '' }};

      const result = executeGuard(activatedRoute, {} as RouterStateSnapshot) as Observable<boolean>;
      result.subscribe(res => {
        expect(res).toBe(false);
        done();
      });
    });
  });

  describe('Integration tests', () => {
    it('Returns true if role service authorizes the user as a moderator', () => {
      store.dispatch(setUser({
        id: '1',
        username: 'ryota1',
        roles: [roles.moderator, roles.user],
      }));

      const activatedRoute = new ActivatedRouteSnapshot();
      activatedRoute.data = { quiz: { creatorId: '1' }};

      const result = executeGuard(activatedRoute, {} as RouterStateSnapshot);
      expect(result).toBe(true);
    });

    it('Returns an observable that resolves to true if the store returns an id that matches the creator', (done: DoneFn) => {
      store.dispatch(setUser({
        id: '1',
        username: 'ryota1',
        roles: [roles.user],
      }));

      const activatedRoute = new ActivatedRouteSnapshot();
      activatedRoute.data = { quiz: { creatorId: '1' }};

      const result = executeGuard(activatedRoute, {} as RouterStateSnapshot) as Observable<boolean>;
      result.subscribe(res => {
        expect(res).toBe(true);
        done();
      });
    });

    it('Returns an observable that resolves to false if the store returns an id that does not match the creator', (done: DoneFn) => {
      store.dispatch(setUser({
        id: '1',
        username: 'ryota1',
        roles: [roles.user],
      }));
      
      const activatedRoute = new ActivatedRouteSnapshot();
      activatedRoute.data = { quiz: { creatorId: '' }};

      const result = executeGuard(activatedRoute, {} as RouterStateSnapshot) as Observable<boolean>;
      result.subscribe(res => {
        expect(res).toBe(false);
        done();
      });
    });
  });
});
