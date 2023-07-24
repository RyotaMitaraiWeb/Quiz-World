import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpResponse, HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { IAuthSuccessResponse } from '../../../../types/responses/auth.types';
import { IAppStore } from '../../../../types/store/store.types';
import { AuthService } from '../../../core/auth-service/auth.service';
import { AppStoreModule } from '../../../store/app-store.module';
import { Location } from '@angular/common';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {


  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
          RegisterComponent,
          HttpClientTestingModule,
          AppStoreModule,
          NoopAnimationsModule
        ]
      });

      fixture = TestBed.createComponent(RegisterComponent);
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

    describe('register method', () => {
      it('Calls the router, localStorage, and store when successful', fakeAsync(() => {
        spyOn(authService, 'register').and.returnValue(of(new HttpResponse<IAuthSuccessResponse>({
          status: HttpStatusCode.Created,
          statusText: 'Created',
          body: {
            id: '1',
            username: 'a',
            token: 'a',
            roles: [],
          },
        })));

        spyOn(router, 'navigate').and.stub();
        spyOn(store, 'dispatch').and.stub();
        spyOn(localStorage, 'setItem').and.stub();

        component.register(event);
        tick();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'a');
      }));

      it('Does not call the router and store if the auth service returns an error response', fakeAsync(() => {
        spyOn(authService, 'register').and.returnValue(new Observable(o => {
          o.error(new HttpErrorResponse({
            status: HttpStatusCode.BadRequest,
            statusText: 'BadRequest',
            error: ['error'],
          }));
        }));

        spyOn(router, 'navigate').and.stub();
        spyOn(store, 'dispatch').and.stub();
        spyOn(localStorage, 'setItem').and.stub();

        component.register(event);
        tick();

        expect(authService.register).toHaveBeenCalledTimes(1);
        expect(router.navigate).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
        expect(localStorage.setItem).not.toHaveBeenCalled();
      }));
    });

    describe('togglePasswordVisibility', () => {
      it('Toggles the passwordIsVisible property', () => {
        expect(component.passwordIsVisible)
          .withContext('Password visibility started as true, expected it to start as false')
          .toBeFalse();

        component.togglePasswordVisibility(event);
        expect(component.passwordIsVisible).toBeTrue();

        component.togglePasswordVisibility(event);
        expect(component.passwordIsVisible).toBeFalse();
      });
    });
  });

  describe('Component tests', () => {
    let loader: HarnessLoader;
    let element: HTMLElement;
    let location: Location

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RegisterComponent,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: '', component: RegisterComponent },
            { path: 'register', component: RegisterComponent }
          ]),
          AppStoreModule,
          NoopAnimationsModule
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(RegisterComponent);

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

      it('Shows an alphanumeric error message for username field', async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const usernameField = inputFields[0];

        await usernameField.focus();
        await usernameField.setValue('ryota!');
        await usernameField.blur();

        fixture.detectChanges();

        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
        expect(errors[0].textContent).toBe('Username must consist solely of alphanumeric characters');
      });

      it('Shows a minlength error message for username field', async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const usernameField = inputFields[0];

        await usernameField.focus();
        await usernameField.setValue('r');
        await usernameField.blur();

        fixture.detectChanges();

        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
        expect(errors[0].textContent).toBe('Username must be at least 5 characters long!');
      });

      it('Shows a maxlength error message for username field', async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const usernameField = inputFields[0];

        await usernameField.focus();
        await usernameField.setValue('ryotaryotaryota1');
        await usernameField.blur();

        fixture.detectChanges();

        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
        expect(errors[0].textContent).toBe('Username must be no more than 15 characters long!');
      });

      it('Shows a unique username error message for username field (status code 200)', waitForAsync(async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const usernameField = inputFields[0];

        spyOn(authService, 'usernameExists').and.returnValue(
          of(new HttpResponse({ status: HttpStatusCode.Ok, statusText: 'Ok'}))
        );

        await usernameField.setValue('ryota1');
        await usernameField.blur();
        await fixture.whenStable();
        fixture.detectChanges();
        
        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
        expect(errors[0].textContent).toBe('This username is already taken!');

      }));

      it('Shows a unique username error message for username field (status code different from 200)', waitForAsync(async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const usernameField = inputFields[0];

        spyOn(authService, 'usernameExists').and.returnValue(
          new Observable(o => {
            o.error(
              new HttpResponse({ status: HttpStatusCode.ServiceUnavailable, statusText: 'Service Unavailable'})
            );
          })
        );

        await usernameField.setValue('ryota1');
        await usernameField.blur();
        await fixture.whenStable();
        fixture.detectChanges();
                
        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
        expect(errors[0].textContent).toBe('Something went wrong! Please try again later!');

      }));

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

      it('Shows a minlength error message for password field', async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const passwordField = inputFields[1];

        await passwordField.focus();
        await passwordField.setValue('a');
        await passwordField.blur();

        fixture.detectChanges();

        const errors = element.querySelectorAll('mat-error');
        expect(errors.length).toBe(1);
        expect(errors[0].textContent).toBe('Password must be at least 6 characters long!');
      });

      it('Password visibility can be toggled successfully', async () => {
        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        // const passwordField = inputFields[1];
        const button = await loader.getHarness(MatButtonHarness);

        const ariaLabel1 = element.querySelector('[aria-label="Show password"]');
        expect(ariaLabel1)
          .withContext('Password should not be visible on load')
          .not.toBeNull();

        await button.click();
        const ariaLabel2 = element.querySelector('[aria-label="Hide password"]');
        expect(ariaLabel2).not.toBeNull();

        await button.click();

        const ariaLabel3 = element.querySelector('[aria-label="Show password"]');
        expect(ariaLabel3).not.toBeNull();
      });
    });

    describe('Submitting', () => {
      it('Submit button is disabled if the form is invalid', async () => {
        const button = (await loader.getAllHarnesses(MatButtonHarness))[1];
        expect(component.form.invalid)
          .withContext('Expected form to be invalid')
          .toBeTrue();

        expect(await button.isDisabled()).toBeTrue();
      });

      it('Successful register redirects and sets the store correctly', waitForAsync(async () => {
        spyOn(authService, 'register').and.returnValue(of(new HttpResponse<IAuthSuccessResponse>({
          status: HttpStatusCode.Created,
          statusText: 'Created',
          body: {
            token: 'a',
            id: '1',
            username: 'a',
            roles: [],
          }
        })));

        await router.navigate(['register']);
        await fixture.whenStable();
        fixture.detectChanges();

        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const button = (await loader.getAllHarnesses(MatButtonHarness))[1];


        const [usernameField, passwordField] = inputFields;

        await usernameField.setValue('ryota1');
        await passwordField.setValue('123456');

        fixture.detectChanges();

        await button.click();

        await fixture.whenStable();
        fixture.detectChanges();

        store.select('user').subscribe(user => {
          expect(user.id).toBe('1');
        })

        expect(location.path()).toBe('/');
        expect(localStorage.getItem('token')).toBe('a');

      }));

      it('Unsuccessful register does not invoke the router and store', waitForAsync(async () => {
        spyOn(authService, 'register').and.returnValue(
          new Observable(o => {
            o.error(new HttpErrorResponse({
              status: HttpStatusCode.Unauthorized,
              statusText: 'Unauthorized',
              error: ['a'],
            }));
          })
        );

        await router.navigate(['register']);
        await fixture.whenStable();
        fixture.detectChanges();

        const inputFields = await loader.getAllHarnesses(MatInputHarness);
        const button = (await loader.getAllHarnesses(MatButtonHarness))[1];

        const [usernameField, passwordField] = inputFields;

        await usernameField.setValue('a');
        await passwordField.setValue('b');

        fixture.detectChanges();


        await button.click();

        await fixture.whenStable();
        fixture.detectChanges();

        store.select('user').subscribe(user => {
          expect(user.id).toBe('');
        })

        expect(location.path()).toBe('/register');
        expect(localStorage.getItem('token')).toBe(null);
      }));
    });

    afterEach(() => {
      localStorage.clear();
    });
  });
  });
