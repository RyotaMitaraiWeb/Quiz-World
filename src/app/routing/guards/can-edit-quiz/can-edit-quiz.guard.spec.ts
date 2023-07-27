import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterState, RouterStateSnapshot } from '@angular/router';

import { canEditQuizGuard } from './can-edit-quiz.guard';
import { IAppStore } from '../../../../types/store/store.types';
import { Store } from '@ngrx/store';
import { RoleService } from '../../../core/role-service/role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppStoreModule } from '../../../store/app-store.module';
import { roles } from '../../../constants/roles.constants';
import { Observable, of } from 'rxjs';
import { setUser } from '../../../store/user/user.action';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { IEditQuizForm } from '../../../../types/components/quiz-form.types';

describe('canEditQuizGuard', () => {
  let quizService: QuizService;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canEditQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, AppStoreModule],
    });

    quizService = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('Unit tests', () => {
    it('Returns an observable of true if quiz service returns data', waitForAsync(() => {
      spyOn(quizService, 'getQuizForEdit')
        .withArgs(1)
        .and.returnValue(of(
          new HttpResponse(
            {
              status: HttpStatusCode.Ok,
              statusText: 'Ok',
              body: {
                id: 1,
                title: 'a',
                description: 'a',
                questions: [],
              } as IEditQuizForm
            }
          )
        ));

      const route = new ActivatedRouteSnapshot();
      route.params = { id: '1' };

      const result = executeGuard(route, {} as RouterStateSnapshot) as Observable<boolean>;
      result.subscribe(res => {        
        expect(res).toBeTrue();
        expect(route.data['quiz'].id).toBe(1);
      });
    }));

    it('Returns an observable of false if quiz service throws an error', () => {
      spyOn(quizService, 'getQuizForEdit')
        .withArgs(1)
        .and.returnValue(
          new Observable(o =>
            o.error(new HttpResponse(
              {
                status: HttpStatusCode.Forbidden,
                statusText: 'Forbidden',
                body: [],
              }
            ))
          ));

      const activatedRoute = new ActivatedRouteSnapshot();
      activatedRoute.params = { id: '1' }

      const result = executeGuard(activatedRoute, {} as RouterStateSnapshot) as Observable<boolean>;
      result.subscribe(res => {
        expect(res).toBe(false);
      });
    });
  });

  // describe('Integration tests', () => {
  //   it('Returns true if role service authorizes the user as a moderator', () => {
  //     store.dispatch(setUser({
  //       id: '1',
  //       username: 'ryota1',
  //       roles: [roles.moderator, roles.user],
  //     }));

  //     const activatedRoute = new ActivatedRouteSnapshot();
  //     activatedRoute.data = { quiz: { creatorId: '1' }};

  //     const result = executeGuard(activatedRoute, {} as RouterStateSnapshot);
  //     expect(result).toBe(true);
  //   });

  //   it('Returns an observable that resolves to true if the store returns an id that matches the creator', (done: DoneFn) => {
  //     store.dispatch(setUser({
  //       id: '1',
  //       username: 'ryota1',
  //       roles: [roles.user],
  //     }));

  //     const activatedRoute = new ActivatedRouteSnapshot();
  //     activatedRoute.data = { quiz: { creatorId: '1' }};

  //     const result = executeGuard(activatedRoute, {} as RouterStateSnapshot) as Observable<boolean>;
  //     result.subscribe(res => {
  //       expect(res).toBe(true);
  //       done();
  //     });
  //   });

  //   it('Returns an observable that resolves to false if the store returns an id that does not match the creator', (done: DoneFn) => {
  //     store.dispatch(setUser({
  //       id: '1',
  //       username: 'ryota1',
  //       roles: [roles.user],
  //     }));

  //     const activatedRoute = new ActivatedRouteSnapshot();
  //     activatedRoute.data = { quiz: { creatorId: '' }};

  //     const result = executeGuard(activatedRoute, {} as RouterStateSnapshot) as Observable<boolean>;
  //     result.subscribe(res => {
  //       expect(res).toBe(false);
  //       done();
  //     });
  //   });
  // });
});
