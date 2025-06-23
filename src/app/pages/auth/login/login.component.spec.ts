import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
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
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SignalrService } from '../../../services/signalr/signalr.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loader: HarnessLoader;
  let httpTest: HttpTestingController;
  let connection: SignalrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideExperimentalZonelessChangeDetection(), provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    connection = TestBed.inject(SignalrService);
    spyOn(connection, 'connect').and.stub();
    component = fixture.componentInstance;
    httpTest = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component tests', () => {
    it('Handles successful login correctly', async () => {
      const usernameField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Your username...' }));
      const passwordField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password...' }));
      const spy = spyOn(window.localStorage, 'setItem').and.stub();

      await usernameField.setValue('admin');
      await passwordField.setValue('123456');
      await fixture.whenStable();

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Log into my account' }));
      await button.click();
      await fixture.whenStable();

      const request = httpTest.expectOne(api.endpoints.auth.login);
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
    });

    it('Handles wrong username and password correctly', async () => {
      const usernameField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Your username...' }));
      const passwordField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password...' }));
      const spy = spyOn(window.localStorage, 'setItem').and.stub();

      await usernameField.setValue('admin');
      await passwordField.setValue('123456');
      await fixture.whenStable();

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Log into my account' }));
      await button.click();

      await fixture.whenStable();

      const request = httpTest.expectOne(api.endpoints.auth.login);
      request.flush({
        token: 'a',
        id: '1',
        username: 'admin',
        roles: [roles.user],
      } as SuccessfulAuthResponse, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });

      await fixture.whenStable();

      expect(spy).not.toHaveBeenCalled();

      const error = fixture.debugElement.query(By.css('.error'));
      expect(error).not.toBeNull();
    });

    it('Disables the submit button when a request is ongoing', async () => {
      const usernameField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Your username...' }));
      const passwordField = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password...' }));
      spyOn(window.localStorage, 'setItem').and.stub();

      await usernameField.setValue('admin');
      await passwordField.setValue('123456');
      await fixture.whenStable();

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Log into my account' }));
      await button.click();
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeTrue();

      const request = httpTest.expectOne(api.endpoints.auth.login);
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
    });
  });

  afterEach(() => {
    httpTest.verify();
  });
});
