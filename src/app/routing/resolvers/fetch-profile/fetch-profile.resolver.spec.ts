import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { fetchProfileResolver } from './fetch-profile.resolver';
import { Observable, of } from 'rxjs';
import { IUserState } from '../../../../types/store/user.types';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { AuthService } from '../../../core/auth-service/auth.service';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { roles } from '../../../constants/roles.constants';
import { IEditQuizForm } from '../../../../types/components/quiz-form.types';
import { IProfile } from '../../../../types/others/lists.types';
import { api } from '../../../constants/api.constants';

describe('fetchProfileResolver', () => {
  const executeResolver: ResolveFn<Observable<IUserState | null>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => fetchProfileResolver(...resolverParameters));

  let authService: AuthService;
  let controller: HttpTestingController;
  const resposnse: IUserState = {
          id: '1',
          username: 'a',
          roles: [roles.user]
        }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    authService = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('Retrieves user data (unit test)', () => {
    const activatedRoute = new ActivatedRouteSnapshot();

    activatedRoute.params = {
      id: '1',
    };

    spyOn(authService, 'getProfile').and.returnValue(
      of(new HttpResponse({
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
        body: resposnse
      }))
    );

    const result = executeResolver(activatedRoute, {} as RouterStateSnapshot) as Observable<IUserState>;
    result.subscribe(res => {
      expect(res).toEqual(resposnse);
    });
  });

  it('Retrieves user data (integration test)', () => {
    const activatedRoute = new ActivatedRouteSnapshot();

    activatedRoute.params = {
      id: '1',
    };

    const result = executeResolver(activatedRoute, {} as RouterStateSnapshot) as Observable<IUserState>;
    result.subscribe(res => {
      expect(res).toEqual(resposnse);
    });

    const request = controller.expectOne(api.endpoints.auth.profile('1'));
    request.flush(resposnse, {
      status: HttpStatusCode.Ok,
      statusText: 'Ok'
    });
  });
});
