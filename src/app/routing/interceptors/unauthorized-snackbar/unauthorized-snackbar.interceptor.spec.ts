import { TestBed } from '@angular/core/testing';

import { UnauthorizedSnackbarInterceptor } from './unauthorized-snackbar.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('UnauthorizedSnackbarInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthorizedSnackbarInterceptor,
      MatSnackBar,
      ]
  }));

  it('should be created', () => {
    const interceptor: UnauthorizedSnackbarInterceptor = TestBed.inject(UnauthorizedSnackbarInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
