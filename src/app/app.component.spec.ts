import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStoreModule } from './store/app-store.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './core/auth-service/auth.service';
import { IAppStore } from '../types/store/store.types';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { IAuthSuccessResponse } from '../types/responses/auth.types';

describe('AppComponent', () => {
  let authService: AuthService;
  let store: Store<IAppStore>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          CoreModule,
          HttpClientTestingModule,
        ],
        declarations: [AppComponent]
      });

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store);
      authService = TestBed.inject(AuthService);
    });

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    describe('ngOnInit implementation', () => {
      it('Sets the store if retrieveSession returns a valid session', waitForAsync(() => {
        spyOn(authService, 'retrieveSession').and.returnValue(
          of(new HttpResponse(
            {
              status: HttpStatusCode.Created,
              statusText: 'Created',
              body: {
                id: '1',
                username: 'a',
                roles: [],
                token: 'a',
              } as IAuthSuccessResponse,
            },
          ))
        );

        component.ngOnInit();
        store.select('user').subscribe(user => {
          expect(user.id).toBe('1');
        });
      }));

      it('Does not set the store and calls localStorage\' removeItem method if session is invalid', waitForAsync(() => {
        spyOn(authService, 'retrieveSession').and.returnValue(
          new Observable(o => {
            o.error(
              new HttpErrorResponse({
                status: HttpStatusCode.Unauthorized,
                statusText: 'Unauthorized',
              })
            );
          })
        );

        spyOn(localStorage, 'removeItem').and.stub();
        spyOn(store, 'dispatch').and.callThrough();

        component.ngOnInit();
        expect(localStorage.removeItem).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalled();
        store.select('user').subscribe(user => {
          expect(user.id).toBe('');
        });
      }));

      it('Does not call localStorage\'s removeItem method if response status is >= 500', waitForAsync(() => {
        spyOn(authService, 'retrieveSession').and.returnValue(
          new Observable(o => {
            o.error(
              new HttpErrorResponse({
                status: HttpStatusCode.InternalServerError,
                statusText: 'Internal Server Error',
              })
            );
          })
        );

        spyOn(localStorage, 'removeItem').and.stub();
        spyOn(store, 'dispatch').and.callThrough();

        component.ngOnInit();
        expect(localStorage.removeItem).not.toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalled();

        store.select('user').subscribe(user => {
          expect(user.id).toBe('');
        });
      }));
    });
  });
});
