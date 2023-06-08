import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ICreatedQuizResponse, IQuizDetails } from '../../../types/responses/quiz.types';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
describe('QuizService', () => {
  let service: QuizService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(QuizService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('Correctly returns a response with a given body (response is ok)', (done: DoneFn) => {
      const res: ICreatedQuizResponse = {
        id: 1,
      };

      const body: IQuizFormSubmission = {
        title: 'a',
        description: 'b',
        instantMode: false,
        questions: []
      }

      service.create(body).subscribe({
        next: (res) => {
          const body = res.body;
          const id = body?.id;

          expect(id).toBe(1);
          expect(res.status).toBe(HttpStatusCode.Created);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error');
        }
      });

      const req = httpTestingController.expectOne(service.url.create);

      expect(req.request.method).toEqual('POST');
      expect(req.request.body.title).toBe('a');
      expect(req.request.body.description).toBe('b');
      expect(req.request.body.instantMode).toBeFalse();
      expect(req.request.body.questions).toEqual([]);

      req.flush(res, {
        status: HttpStatusCode.Created,
        statusText: 'Created',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const res = ['a', 'b'];
      const body: IQuizFormSubmission = {
        title: 'a',
        description: 'b',
        instantMode: false,
        questions: []
      }

      service.create(body).subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one')
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.Unauthorized);
          expect(err.error).toEqual(res);
          console.log(err);
          
          done();
        }
      });

      const req = httpTestingController.expectOne(service.url.create);

      expect(req.request.method).toEqual('POST');
      req.flush(res, {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized',
      });
    });
  });

  describe('getById', () => {
    it('Correctly returns a response with a given body (response is ok)', (done: DoneFn) => {
      const response: IQuizDetails = {
        id: 1,
        title: 'some title',
        description: '',
        instantMode: false,
        questions: []
      }

      service.getById(response.id).subscribe({
        next: (res) => {
          expect(res.status).toBe(HttpStatusCode.Ok);
          expect(res.body?.id).toBe(response.id);
          expect(res.body?.title).toBe(response.title);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(service.url.id(response.id));
      expect(req.request.method).toBe('GET');
      expect(req.request.url.endsWith(`/quiz/${response.id}`)).toBeTrue();

      req.flush(response, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b']

      service.getById(0).subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);          
          done();
        }
      });

      const req = httpTestingController.expectOne(service.url.id(0));
      expect(req.request.method).toBe('GET');
      expect(req.request.url.endsWith('/quiz/0')).toBeTrue();

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
