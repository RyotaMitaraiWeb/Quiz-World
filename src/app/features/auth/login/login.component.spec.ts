import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { AppStoreModule } from '../../../store/app-store.module';
import { api } from '../../../constants/api.constants';
import { IAuthSuccessResponse } from '../../../../types/responses/auth.types';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';
import { IAppStore } from '../../../../types/store/store.types';
import { AuthService } from '../../../core/auth-service/auth.service';
import { Observable, firstValueFrom, of, throwError, timer } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatInputHarness } from '@angular/material/input/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonHarness } from '@angular/material/button/testing';
import { NgZone } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const event = new Event('submit');
  let testController: HttpTestingController;
  let store: Store<IAppStore>;

  let authService: AuthService;
  let router: Router;

  let ngZone: NgZone;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          LoginComponent,
          HttpClientTestingModule,
          AppStoreModule,
          NoopAnimationsModule
        ]
      });

      fixture = TestBed.createComponent(LoginComponent);
      testController = TestBed.inject(HttpTestingController);
      store = TestBed.inject(Store);
      authService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('login method', () => {
      it('Calls the router, localStorage, and store when successful', fakeAsync(() => {
        spyOn(authService, 'login').and.returnValue(of(new HttpResponse<IAuthSuccessResponse>({
          status: HttpStatusCode.Created,
          statusText: 'Created',
          body: {
            id: 1,
            username: 'a',
            token: 'a',
            roles: [],
          },
        })));

        spyOn(router, 'navigate').and.stub();
        spyOn(store, 'dispatch').and.stub();
        spyOn(localStorage, 'setItem').and.stub();

        component.login(event);
        tick();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'a');
      }));

      it('Does not call the router and store if the auth service returns an error response', fakeAsync(() => {
        spyOn(authService, 'login').and.returnValue(new Observable(o => {
          o.error(new HttpErrorResponse({
            status: HttpStatusCode.Forbidden,
            statusText: 'Forbidden',
            error: ['error'],
          }));
        }));

        spyOn(router, 'navigate').and.stub();
        spyOn(store, 'dispatch').and.stub();
        spyOn(localStorage, 'setItem').and.stub();

        component.login(event);
        tick();

        expect(authService.login).toHaveBeenCalledTimes(1);
        expect(router.navigate).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
        expect(localStorage.setItem).not.toHaveBeenCalled();
      }));
    });
  });

  describe('Component tests', () => {
    let loader: HarnessLoader;
    let element: HTMLElement;
    let location: Location

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          LoginComponent,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent }
          ]),
          AppStoreModule,
          NoopAnimationsModule
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(LoginComponent);

      element = fixture.debugElement.nativeElement;
      loader = TestbedHarnessEnvironment.loader(fixture);

      testController = TestBed.inject(HttpTestingController);

      store = TestBed.inject(Store);
      authService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);

      location = TestBed.inject(Location);
      ngZone = TestBed.inject(NgZone);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('Input fields', () => {
      it('Shows a required error message for username field', async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const usernameField = inputFields[0];

        await usernameField.focus();
        await usernameField.setValue('');
        await usernameField.blur();

        fixture.detectChanges();

        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
      });

      it('Shows a required error message for password field', async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const passwordField = inputFields[1];

        await passwordField.focus();
        await passwordField.setValue('');
        await passwordField.blur();

        fixture.detectChanges();

        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
      });
    });

    describe('Submitting', () => {
      it('Submit button is disabled if the form is invalid', async () => {
        const button = await loader.getHarness(MatButtonHarness);
        expect(component.form.invalid)
          .withContext('Expected form to be invalid')
          .toBeTrue();

        expect(await button.isDisabled()).toBeTrue();
      });

      it('Successful login redirects and sets the store correctly', waitForAsync(async () => {
        spyOn(authService, 'login').and.returnValue(of(new HttpResponse<IAuthSuccessResponse>({
          status: HttpStatusCode.Created,
          statusText: 'Created',
          body: {
            token: 'a',
            id: 1,
            username: 'a',
            roles: [],
          }
        })));

        await router.navigate(['login']);
        await fixture.whenStable();
        fixture.detectChanges();

        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const button = await loader.getHarness(MatButtonHarness);

        const [usernameField, passwordField] = inputFields;

        await usernameField.setValue('a');
        await passwordField.setValue('b');

        fixture.detectChanges();

        await button.click();

        await fixture.whenStable();
        fixture.detectChanges();

        store.select('user').subscribe(user => {
          expect(user.id).toBe(1);
        })

        expect(location.path()).toBe('/');
        expect(localStorage.getItem('token')).toBe('a');

      }));

      it('Unsuccessful login does not invoke the router and store', waitForAsync(async () => {
        spyOn(authService, 'login').and.returnValue(
          new Observable(o => {
            o.error(new HttpErrorResponse({
              status: HttpStatusCode.Unauthorized,
              statusText: 'Unauthorized',
              error: ['a'],
            }));
          })
        );
        
        await router.navigate(['login']);
        await fixture.whenStable();
        fixture.detectChanges();

        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const button = await loader.getHarness(MatButtonHarness);

        const [usernameField, passwordField] = inputFields;

        await usernameField.setValue('a');
        await passwordField.setValue('b');

        fixture.detectChanges();


        await button.click();

        await fixture.whenStable();
        fixture.detectChanges();

        store.select('user').subscribe(user => {
          expect(user.id).toBe(0);
        })

        expect(location.path()).toBe('/login');
        expect(localStorage.getItem('token')).toBe(null);
      }));
    });

    afterEach(() => {
      localStorage.clear();
    });
  });
});
