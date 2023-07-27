import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { fetchQuizResolver } from './fetch-quiz.resolver';
import { IQuizDetails } from '../../../../types/responses/quiz.types';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { questionTypes } from '../../../constants/question-types.constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('fetchQuizResolver', () => {
  let quizService: QuizService;
  const executeResolver: ResolveFn<IQuizDetails> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => fetchQuizResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    quizService = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('Returns the quiz', (done: DoneFn) => {
    const activatedRoute = new ActivatedRouteSnapshot();

    activatedRoute.params = {
      id: '1',
    };

    spyOn(quizService, 'getById').and.returnValue(
      of(
        new HttpResponse(
          {
            status: HttpStatusCode.Ok,
            statusText: 'Ok',
            body: {
              id: 1,
              title: 'a',
              description: 'a',
              instantMode: false,
              questions: [
                {
                  id: '1',
                  type: questionTypes.text,
                  prompt: 'a',
                  answers: []
                }
              ],
              creatorId: '1'
            } as IQuizDetails
          }
        )
      )
    )
    
    const result = executeResolver(activatedRoute, {} as RouterStateSnapshot) as Observable<IQuizDetails>;
    result.subscribe({
      next: (res) => {
        expect(res.id).toBe(1);
        done();
      },
      error: (err) => {
        done.fail('Expected a successful response, not an error one');
        console.warn(err);
      }
    });
  });
});
