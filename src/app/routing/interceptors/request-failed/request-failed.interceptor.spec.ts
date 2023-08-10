import { TestBed } from '@angular/core/testing';

import { RequestFailedInterceptor } from './request-failed.interceptor';

describe('RequestFailedInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestFailedInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestFailedInterceptor = TestBed.inject(RequestFailedInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
