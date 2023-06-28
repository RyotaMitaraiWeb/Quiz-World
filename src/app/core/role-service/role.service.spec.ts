import { TestBed, waitForAsync } from '@angular/core/testing';

import { RoleService } from './role.service';
import { AppStoreModule } from '../../store/app-store.module';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { setUser } from '../../store/user/user.action';
import { roles } from '../../constants/roles.constants';

describe('RoleService', () => {
  let service: RoleService;
  let store: Store<IAppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppStoreModule]
    });
    service = TestBed.inject(RoleService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sets userRoles on initialization', waitForAsync(() => {
    store.dispatch(setUser({
      id: 1,
      username: 'a',
      roles: ['User']
    }));

    const newService = TestBed.inject(RoleService);
    expect(newService.userRoles).toEqual(['User']);
  }));

  describe('isAdmin', () => {
    it('Returns true if userRoles contains Administrator', () => {
      service.userRoles = [roles.admin];
      expect(service.isAdmin()).toBeTrue();

      service.userRoles = [roles.admin, roles.moderator];
      expect(service.isAdmin()).toBeTrue();
    });

    it('Returns false if the user is not an administrator', () => {
      service.userRoles = [];
      expect(service.isAdmin()).toBeFalse();

      service.userRoles = [roles.moderator, roles.user];
      expect(service.isAdmin()).toBeFalse();
    });
  });

  describe('isModerator', () => {
    it('Returns true if userRoles contains Moderator', () => {
      service.userRoles = [roles.moderator];
      expect(service.isModerator()).toBeTrue();

      service.userRoles = [roles.admin, roles.moderator];
      expect(service.isModerator()).toBeTrue();
    });

    it('Returns false if the user is not a moderator', () => {
      service.userRoles = [];
      expect(service.isModerator()).toBeFalse();

      service.userRoles = [roles.user];
      expect(service.isModerator()).toBeFalse();
    });
  });

  describe('isGuestr', () => {
    it('Returns true if userRoles is empty', () => {
      service.userRoles = [];
      expect(service.isGuest()).toBeTrue();
    });

    it('Returns false if userRoles is not empty', () => {
      service.userRoles = [roles.user];
      expect(service.isGuest()).toBeFalse();
    });
  });
});