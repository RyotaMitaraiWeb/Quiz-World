import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { api } from '../../../common/api';
import { SuccessfulAuthResponse } from '../../../services/auth/types';
import { roles } from '../../../common/roles';
import { MatButtonHarness } from '@angular/material/button/testing';
import { AuthService } from '../../../services/auth/auth.service';
import { of } from 'rxjs';
import { registerValidationRules } from '../../../common/validationRules/register';
import { provideRouter } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let loader: HarnessLoader;
  let httpTest: HttpTestingController;

  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideExperimentalZonelessChangeDetection(), provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    httpTest = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    spyOn(authService, 'checkIfUsernameExists').and.returnValue(of(false));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component tests', () => {
    it('Handles successful register correctly', fakeAsync(async () => {
      const usernameField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Your username...' }));
      const passwordField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password...' }));
      const spy = spyOn(window.localStorage, 'setItem').and.stub();

      await usernameField.setValue('admin');
      await passwordField.setValue('123456');
      await fixture.whenStable();

      tick(registerValidationRules.username.UNIQUE_USERNAME_TIMEOUT);

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Create my account' }));
      await button.click();
      await fixture.whenStable();


      const request = httpTest.expectOne(api.endpoints.auth.register);
      request.flush({
        token: 'a',
        id: '1',
        username: 'admin',
        roles: [roles.user],
      } as SuccessfulAuthResponse, {
        status: HttpStatusCode.Created,
        statusText: 'Created',
      });

      expect(spy).toHaveBeenCalledWith('token', 'a');
    }));

    it('Handles wrong username and password correctly', fakeAsync(async () => {
      const usernameField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Your username...' }));
      const passwordField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password...' }));
      const spy = spyOn(window.localStorage, 'setItem').and.stub();

      await usernameField.setValue('admin');
      await passwordField.setValue('123456');
      await fixture.whenStable();

      tick(registerValidationRules.username.UNIQUE_USERNAME_TIMEOUT);

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Create my account' }));
      await button.click();

      await fixture.whenStable();

      const request = httpTest.expectOne(api.endpoints.auth.register);
      request.flush({}, {
        status: HttpStatusCode.BadRequest,
        statusText: 'Bad request',
      });

      await fixture.whenStable();

      expect(spy).not.toHaveBeenCalled();
    }));

    it('Disables the submit button when a request is ongoing', fakeAsync(async () => {
      const usernameField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Your username...' }));
      const passwordField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password...' }));
      spyOn(window.localStorage, 'setItem').and.stub();

      await usernameField.setValue('admin');
      await passwordField.setValue('123456');
      await fixture.whenStable();

      tick(registerValidationRules.username.UNIQUE_USERNAME_TIMEOUT);

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Create my account' }));
      await button.click();
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeTrue();

      const request = httpTest.expectOne(api.endpoints.auth.register);
      request.flush({
        token: 'a',
        id: '1',
        username: 'admin',
        roles: [roles.user],
      } as SuccessfulAuthResponse, {
        status: HttpStatusCode.Created,
        statusText: 'Created',
      });

      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();
    }));
  });

  afterEach(() => {
    httpTest.verify();
  });
});
