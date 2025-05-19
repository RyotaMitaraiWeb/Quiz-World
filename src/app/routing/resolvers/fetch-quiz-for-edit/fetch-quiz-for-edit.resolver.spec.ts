import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterState, RouterStateSnapshot } from '@angular/router';

import { fetchQuizForEditResolver } from './fetch-quiz-for-edit.resolver';
import { IEditQuizForm } from '../../../../types/components/quiz-form.types';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { api } from '../../../constants/api.constants';

describe('fetchQuizForEditResolver', () => {
  const executeResolver: ResolveFn<Observable<IEditQuizForm | null>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => fetchQuizForEditResolver(...resolverParameters));

  let quizService: QuizService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    quizService = TestBed.inject(QuizService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('Retrieves a quiz (unit test)', () => {
    const route = new ActivatedRouteSnapshot();
    route.params = {
      id: 1,
    };

    spyOn(quizService, 'getQuizForEdit').and.returnValue(
      of(
        new HttpResponse<IEditQuizForm>
          (
            {
              status: HttpStatusCode.Ok,
              statusText: 'Ok',
              body: {
                title: 'a',
                description: 'b',
                questions: [],
                id: 1,
              }
            }
          )
      )
    );

    const result = executeResolver(route, {} as RouterStateSnapshot) as Observable<IEditQuizForm | null>;
    result.subscribe(res => {
      expect(res?.title).toBe('a');
      expect(res?.id).toBe(1);
    });
  });

  it('Retrieves a quiz (integration test)', () => {
    const route = new ActivatedRouteSnapshot();
    route.params = {
      id: 1,
    };

    const response: IEditQuizForm = {
      title: 'a',
      description: 'b',
      questions: [],
      id: 1,
    }

    const result = executeResolver(route, {} as RouterStateSnapshot) as Observable<IEditQuizForm | null>;
    result.subscribe(res => {
      expect(res).toEqual(response);
    });

    const request = controller.expectOne(api.endpoints.quiz.quizForEdit(1));
    request.flush(response, {
      status: HttpStatusCode.Ok,
      statusText: 'Ok',
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
