import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { LogoutButtonComponent } from './logout-button.component';
import { AppStoreModule } from '../../../../store/app-store.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../../../../features/auth/login/login.component';
import { AuthService } from '../../../auth-service/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../../types/store/store.types';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { setUser } from '../../../../store/user/user.action';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;

  let authService: AuthService;
  let router: Router;
  let store: Store<IAppStore>;
  let location: Location;

  const event = new Event('click');

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          LogoutButtonComponent,
          AppStoreModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: '', component: LoginComponent },
            { path: 'random-page', component: LoginComponent }
          ]),
        ]
      });
      fixture = TestBed.createComponent(LogoutButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      router = TestBed.inject(Router);
      authService = TestBed.inject(AuthService);
      store = TestBed.inject(Store);
      location = TestBed.inject(Location);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('logout method', () => {
      it('Calls the store, localStorage, and router upon success', fakeAsync(() => {
        spyOn(authService, 'logout').and.returnValue(
          of(new HttpResponse({ status: HttpStatusCode.NoContent, statusText: 'No Content' }))
        );

        spyOn(router, 'navigate').and.stub();
        spyOn(localStorage, 'removeItem').and.stub();
        spyOn(store, 'dispatch').and.stub();

        component.logout(event);
        tick();

        expect(router.navigate).toHaveBeenCalledOnceWith(['/login']);
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
      }));

      it('Does not call the store, localStorage, and router upon failure', fakeAsync(() => {
        spyOn(authService, 'logout').and.returnValue(
          new Observable(o => {
            o.error(new HttpResponse({ status: HttpStatusCode.Unauthorized, statusText: 'Unauthorized' }));
          })
        );

        spyOn(router, 'navigate').and.stub();
        spyOn(localStorage, 'removeItem').and.stub();
        spyOn(store, 'dispatch').and.stub();

        component.logout(event);
        tick();

        expect(router.navigate).not.toHaveBeenCalled();
        expect(localStorage.removeItem).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
      }));
    });
  });

  describe('Component tests', () => {
    let element: HTMLElement;
    let logoutButton: HTMLAnchorElement;
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [
          LogoutButtonComponent,
          AppStoreModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: 'login', component: LoginComponent },
            { path: '', component: LoginComponent }
          ]),
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(LogoutButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      router = TestBed.inject(Router);
      authService = TestBed.inject(AuthService);
      store = TestBed.inject(Store);
      location = TestBed.inject(Location);

      element = fixture.debugElement.nativeElement;
      logoutButton = element.querySelector('#logout')!;
      await router.navigate(['/']);
      localStorage.setItem('token', 'a');
      store.dispatch(setUser({
        id: 1,
        username: 'a',
        roles: [],
      }));
    });

    describe('Clicking the button', () => {
      it('Logs the user out successfully for a 204 response', waitForAsync(async () => {
        spyOn(authService, 'logout').and.returnValue(
          of(new HttpResponse({ status: HttpStatusCode.NoContent, statusText: 'No Content' }))
        );

        logoutButton.click();
        await fixture.whenStable();

        expect(location.path()).toBe('/login');
        expect(localStorage.getItem('token')).toBeNull();
        store.select('user').subscribe(user => {
          expect(user.id).toBe(0);
        })
      }));

      it('Does not log out the user for other responses', waitForAsync(async () => {
        spyOn(authService, 'logout').and.returnValue(
          new Observable(o => {
            o.error(
              new HttpErrorResponse({ status: HttpStatusCode.ServiceUnavailable, statusText: 'Service Unavailable' })
            );
          })
        );

        logoutButton.click();
        await fixture.whenStable();

        expect(location.path()).toBe('/');
        expect(localStorage.getItem('token')).toBe('a');
        store.select('user').subscribe(user => {
          expect(user.id).toBe(1);
        })
      }));
    });
  });

  afterEach(() => {
    localStorage.clear();
  });
});
