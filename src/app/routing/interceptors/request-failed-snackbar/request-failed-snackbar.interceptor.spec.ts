import { TestBed } from '@angular/core/testing';

import { RequestFailedSnackbarInterceptor } from './request-failed-snackbar.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('RequestFailedSnackbarInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestFailedSnackbarInterceptor,
      MatSnackBar,
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestFailedSnackbarInterceptor = TestBed.inject(RequestFailedSnackbarInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
