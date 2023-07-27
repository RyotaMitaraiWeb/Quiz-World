import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isGuestGuard } from './is-guest.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppStoreModule } from '../../../store/app-store.module';

describe('isGuestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isGuestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppStoreModule]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
