import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppStoreModule } from '../../../store/app-store.module';
import { api } from '../../../constants/api.constants';
import { IAuthSuccessResponse } from '../../../../types/responses/auth.types';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';
import { IAppStore } from '../../../../types/store/store.types';
import { AuthService } from '../../../core/auth-service/auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const event = new Event('submit');
  let testController: HttpTestingController;
  let store: Store<IAppStore>;

  let authService: AuthService;
  let router: Router;
  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LoginComponent, HttpClientTestingModule, AppStoreModule]
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
      it('Calls the router and store and sets localStorage token when successful', () => {
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

        component.login(event);
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem('token')).toBe('a');
      });

      it('Does not call the router and store if the auth service returns an error response', () => {
        spyOn(authService, 'login').and.returnValue(new Observable(o => {
          o.error(new HttpErrorResponse({
            status: HttpStatusCode.Forbidden,
            statusText: 'Forbidden',
            error: ['error'],
          }));
        }));

        spyOn(router, 'navigate').and.stub();
        spyOn(store, 'dispatch').and.stub();

        component.login(event);

        expect(authService.login).toHaveBeenCalledTimes(1);
        expect(router.navigate).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });

    afterEach(() => {
      localStorage.clear();
    });
  });
});
