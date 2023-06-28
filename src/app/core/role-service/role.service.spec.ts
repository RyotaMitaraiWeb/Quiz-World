import { TestBed, waitForAsync } from '@angular/core/testing';

import { RoleService } from './role.service';
import { AppStoreModule } from '../../store/app-store.module';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { setUser } from '../../store/user/user.action';

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
});
