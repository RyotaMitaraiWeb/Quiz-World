import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, ResolveFn, RouterState, RouterStateSnapshot } from '@angular/router';

import { fetchSearchResults } from './fetch-search-results.resolver';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { IQuizList } from '../../../../types/others/lists.types';
import { Observable, of } from 'rxjs';
import { paramsBuilder } from '../../../util/params-builder/params-builder';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpStatusCode } from '@angular/common/http';
import { api } from '../../../constants/api.constants';

describe('fetchSearchQuizzesResolver', () => {
  const executeResolver: ResolveFn<IQuizList> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => fetchSearchResults(...resolverParameters));

  let quizService: QuizService;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    quizService = TestBed.inject(QuizService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('Returns a list of quizzes (unit test)', (done: DoneFn) => {
    const activatedRoute = new ActivatedRouteSnapshot();
    activatedRoute.queryParams = {
      page: 1,
      sort: 'title',
      order: 'asc',
      search: 'test',
    };

    spyOn(quizService, 'getQuizzesByTitle').and.returnValue(
      of({
        total: 1,
        quizzes: [
          {
            title: 'a',
            description: 'a',
            createdOn: Date.now.toString(),
            updatedOn: Date.now.toString(),
            instantMode: true,
            id: 1,
          }
        ]
      } as IQuizList)
    );
    
    const result = executeResolver(activatedRoute, {} as RouterStateSnapshot) as Observable<IQuizList>;
    result.subscribe({
      next: (res) => {
        expect(res.total).toBe(1);
        expect(quizService.getQuizzesByTitle).toHaveBeenCalledWith('test', 1, 'title', 'asc');

        done();
      },
      error: (err) => {
        done.fail('Expected a successful response, not an error one');
        console.warn(err);
      }
    });
  });

  it('Returns a list of quizzes (integration test)', (done: DoneFn) => {
    const response: IQuizList = {
      total: 1,
      quizzes: [
        {
          title: 'a',
          description: 'a',
          createdOn: Date.now.toString(),
          updatedOn: Date.now.toString(),
          instantMode: true,
          id: 1,
        }
      ]
    };

    const route = new ActivatedRouteSnapshot();
    route.queryParams = {
      search: 'test',
    };

    const result = executeResolver(route, {} as RouterStateSnapshot) as Observable<IQuizList>;
    result.subscribe({
      next: (res) => {
        expect(res).toEqual(response);
        done();
      },
      error: (err) => {
        done.fail('Expected a successful response, not an error one');
        console.warn(err);
      }
    })

    const request = controller.expectOne(api.endpoints.quiz.search + '?search=test');
    request.flush(response, {
      status: HttpStatusCode.Ok,
      statusText: 'Ok',
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
