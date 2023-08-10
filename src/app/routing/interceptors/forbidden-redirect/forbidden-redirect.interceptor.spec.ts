import { TestBed } from '@angular/core/testing';

import { ForbiddenRedirectInterceptor } from './forbidden-redirect.interceptor';

describe('ForbiddenRedirectInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ForbiddenRedirectInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ForbiddenRedirectInterceptor = TestBed.inject(ForbiddenRedirectInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
