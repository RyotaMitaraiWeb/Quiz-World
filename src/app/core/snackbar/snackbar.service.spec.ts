import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let matSnackbar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        { 
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
          useValue: { duration: 0 },
        },
      ]
    });
    service = TestBed.inject(SnackbarService);
    matSnackbar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('Formatting message', () => {
      it('Correctly formats a message string', () => {
        spyOn(matSnackbar, 'open')
          .withArgs('test', undefined, {
            panelClass: ['prewrap']
          })
          .and.stub();

        service.open('test');

        expect(matSnackbar.open).toHaveBeenCalled();
      });

      it('Correctly formats an array of message', () => {
        spyOn(matSnackbar, 'open')
          .withArgs('a\nb', undefined, {
            panelClass: ['prewrap']
          })
          .and.stub();

        service.open(['a', 'b']);

        expect(matSnackbar.open).toHaveBeenCalled();
      });
    });

    describe('Passing action', () => {
      it('Passes undefined to the MatSnackbar if not specified', () => {
        spyOn(matSnackbar, 'open')
          .withArgs('test', undefined, {
            panelClass: ['prewrap']
          })
          .and.stub();

        service.open('test');

        expect(matSnackbar.open).toHaveBeenCalled();
      });

      it('Passes the specified action to the MatSnackbar', () => {
        spyOn(matSnackbar, 'open')
          .withArgs('test', 'got it', {
            panelClass: ['prewrap']
          })
          .and.stub();

        service.open('test', 'got it');

        expect(matSnackbar.open).toHaveBeenCalled();
      });
    });

    describe('Passing class names', () => {
      it('Passes only prewrap if not specified', () => {
        spyOn(matSnackbar, 'open')
          .withArgs('test', 'got it', {
            panelClass: ['prewrap']
          })
          .and.stub();

        service.open('test', 'got it');

        expect(matSnackbar.open).toHaveBeenCalled();
      });

      it('Formats class names correctly', () => {
        spyOn(matSnackbar, 'open')
          .withArgs('test', 'got it', {
            panelClass: ['a', 'b', 'prewrap']
          })
          .and.stub();

        service.open('test', 'got it', 'a', 'b');

        expect(matSnackbar.open).toHaveBeenCalled();
      });
    });
  });
});
