import { TestBed } from '@angular/core/testing';

import { UnauthorizedSnackbarInterceptor } from './unauthorized-snackbar.interceptor';

describe('UnauthorizedSnackbarInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthorizedSnackbarInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UnauthorizedSnackbarInterceptor = TestBed.inject(UnauthorizedSnackbarInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
