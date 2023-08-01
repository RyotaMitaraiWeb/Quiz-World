import { TestBed } from '@angular/core/testing';
import { AnswerService } from './answer.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ICreatedQuizResponse, IGradedAnswer, IQuizDetails, ISessionAnswer } from '../../../types/responses/quiz.types';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AnswerService', () => {
  let service: AnswerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AnswerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCorrectAnswersForQuestionById', () => {
    it('Correctly returns data (response is ok)', (done: DoneFn) => {
      const response: ISessionAnswer[] = [
        {
          value: 'a',
          id: '1',
        },
      ];

      service.getCorrectAnswersForQuestionById('1', 1).subscribe({
        next: (res) => {
          expect(res.status).toBe(HttpStatusCode.Ok);
          expect(res.body).toEqual(response);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one')
        }
      })

      const req = httpTestingController.expectOne(service.url.correctAnswersInstantMode('1') + '?version=1');
      expect(req.request.method).toBe('GET');

      req.flush(response, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly returns data (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b'];

      service.getCorrectAnswersForQuestionById('', 1).subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);
          done();
        }
      })

      const req = httpTestingController.expectOne(service.url.correctAnswersInstantMode('') + '?version=1');
      expect(req.request.method).toBe('GET');

      req.flush(response, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });
  });

  describe('getCorrectAnswersForAllQuestions', () => {
    it('Correctly returns data (response is ok)', (done: DoneFn) => {
      const response: IGradedAnswer[] = [
        {
          id: '1',
          answers: [{
            value: 'a',
            id: '1',
          }]
        },
      ];

      service.getCorrectAnswersForAllQuestions(1, 1).subscribe({
        next: (res) => {
          expect(res.status).toBe(HttpStatusCode.Ok);
          expect(res.body).toEqual(response);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one')
        }
      })

      const req = httpTestingController.expectOne(service.url.correctAnswersFull(1) + '?version=1');
      expect(req.request.method).toBe('GET');

      req.flush(response, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly returns data (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b'];

      service.getCorrectAnswersForAllQuestions(0, 1).subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);
          done();
        }
      })

      const req = httpTestingController.expectOne(service.url.correctAnswersFull(0) + '?version=1');
      expect(req.request.method).toBe('GET');

      req.flush(response, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
