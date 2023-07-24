import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, ResolveFn, RouterState, RouterStateSnapshot } from '@angular/router';

import { fetchSearchResults } from './fetch-search-results.resolver';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { IQuizList } from '../../../../types/others/lists.types';
import { Observable, of } from 'rxjs';
import { paramsBuilder } from '../../params-builder/params-builder';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('fetchAllQuizzesResolver', () => {
  const executeResolver: ResolveFn<IQuizList> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => fetchSearchResults(...resolverParameters));

  let quizService: QuizService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    quizService = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('Returns a list of quizzes', (done: DoneFn) => {
    const activatedRoute = new ActivatedRouteSnapshot();
    activatedRoute.queryParams = {
      ...paramsBuilder(1),
      query: 'test',
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
        done();
      },
      error: (err) => {
        done.fail('Expected a successful response, not an error one');
        console.warn(err);
      }
    })
  })
});
