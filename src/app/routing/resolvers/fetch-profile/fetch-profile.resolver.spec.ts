import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { fetchProfileResolver } from './fetch-profile.resolver';
import { Observable } from 'rxjs';
import { IUserState } from '../../../../types/store/user.types';

describe('fetchProfileResolver', () => {
  const executeResolver: ResolveFn<Observable<IUserState | null>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => fetchProfileResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
