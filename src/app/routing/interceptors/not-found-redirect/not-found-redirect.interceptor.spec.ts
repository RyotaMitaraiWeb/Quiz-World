import { TestBed } from '@angular/core/testing';

import { NotFoundRedirectInterceptor } from './not-found-redirect.interceptor';

describe('NotFoundRedirectInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotFoundRedirectInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NotFoundRedirectInterceptor = TestBed.inject(NotFoundRedirectInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
