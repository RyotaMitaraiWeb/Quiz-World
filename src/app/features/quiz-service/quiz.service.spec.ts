import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ICreatedQuizResponse, IQuizDetails } from '../../../types/responses/quiz.types';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IEditQuizForm, IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { IQuizList, IQuizListItem } from '../../../types/others/lists.types';
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
        questions: [],
        creatorId: '1',
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

  describe('getAllQuizzes', () => {
    it('Correctly returns a response with a given body (response is ok)', (done: DoneFn) => {
      service.getAllQuizzes().subscribe({
        next: (res) => {
          expect(res.quizzes.length).toBe(1);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(service.url.all);

      req.flush({
        quizzes: [
          {
            id: 1,
            title: 'a',
            description: 'a',
            createdOn: '01/01/2002',
            instantMode: true,
          }
        ],
        total: 6,
      } as IQuizList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b']

      service.getAllQuizzes().subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);
          done();
        }
      });

      const req = httpTestingController.expectOne(service.url.all);

      req.flush(response, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });

    it('Attaches headers successfully', (done: DoneFn) => {
      service.getAllQuizzes(2).subscribe({
        next: (res) => {
          expect(res.quizzes.length).toBe(1);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(req => {
        const page = req.params.get('page');
        return req.url === service.url.all && page === '2';
      });

      req.flush({
        quizzes: [{
          id: 1,
          title: 'a',
          description: 'a',
          createdOn: '01/01/2002',
          instantMode: true,
        }],
        total: 6,
      } as IQuizList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });
  });

  describe('getQuizzesByTitle', () => {
    it('Correctly returns a response with a given body (response is ok)', (done: DoneFn) => {
      service.getQuizzesByTitle('a').subscribe({
        next: (res) => {
          expect(res.quizzes.length).toBe(1);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(req => {
        const url = req.url;
        return url === service.url.search;
      });

      req.flush({
        quizzes: [{
          id: 1,
          title: 'a',
          description: 'a',
          createdOn: '01/01/2002',
          instantMode: true,
        }],
        total: 6,
      } as IQuizList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b']

      service.getQuizzesByTitle('a').subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);
          done();
        }
      });

      const req = httpTestingController.expectOne(req => {
        const url = req.url;
        return url === service.url.search;
      });

      req.flush(response, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });

    it('Attaches headers successfully', (done: DoneFn) => {
      service.getQuizzesByTitle('a', 2).subscribe({
        next: (res) => {
          expect(res.quizzes.length).toBe(1);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(req => {
        const page = req.params.get('page');
        const query = req.params.get('title');
        return req.url === service.url.search && page === '2';
      });

      req.flush({
        quizzes: [{
          id: 1,
          title: 'a',
          description: 'a',
          createdOn: '01/01/2002',
          instantMode: true,
        }],
        total: 6,
      } as IQuizList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });
  });

  describe('getUserQuizzes', () => {
    it('Correctly returns a response with a given body (response is ok)', (done: DoneFn) => {
      service.getUserQuizzes('1').subscribe({
        next: (res) => {
          expect(res.quizzes.length).toBe(1);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(service.url.user('1'));

      req.flush({
        quizzes: [{
          id: 1,
          title: 'a',
          description: 'a',
          createdOn: '01/01/2002',
          instantMode: true,
        }],
        total: 6,
      } as IQuizList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b']

      service.getUserQuizzes('1').subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);
          done();
        }
      });

      const req = httpTestingController.expectOne(service.url.user('1'));

      req.flush(response, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });

    it('Attaches headers successfully', (done: DoneFn) => {
      service.getUserQuizzes('1', 2).subscribe({
        next: (res) => {
          expect(res.quizzes.length).toBe(1);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(req => {
        const page = req.params.get('page');
        return req.url === service.url.user('1') && page === '2';
      });

      req.flush({
        quizzes: [{
          id: 1,
          title: 'a',
          description: 'a',
          createdOn: '01/01/2002',
          instantMode: true,
        }],
        total: 6,
      } as IQuizList, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });
  });

  describe('deleteQuiz', () => {
    it('Correctly returns a response with a given body (response is ok)', (done: DoneFn) => {
      const response: IQuizDetails = {
        id: 1,
        title: 'some title',
        description: '',
        instantMode: false,
        questions: [],
        creatorId: '1',
      }

      service.deleteQuiz(response.id).subscribe({
        next: (res) => {
          expect(res.status).toBe(HttpStatusCode.NoContent);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(service.url.delete(response.id));
      expect(req.request.method).toBe('DELETE');

      req.flush(response, {
        status: HttpStatusCode.NoContent,
        statusText: 'No Content',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b']

      service.deleteQuiz(0).subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);
          done();
        }
      });

      const req = httpTestingController.expectOne(service.url.delete(0));
      expect(req.request.method).toBe('DELETE');

      req.flush(response, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });
  });

  describe('edit', () => {
    it('Correctly returns a response (response is ok)', (done: DoneFn) => {
    

      service.edit(1, {} as IQuizFormSubmission).subscribe({
        next: (res) => {
          expect(res.status).toBe(HttpStatusCode.NoContent);
          done();
        },
        error: () => {
          done.fail('Expected a successful response, not an error one');
        }
      });

      const req = httpTestingController.expectOne(service.url.edit(1));
      expect(req.request.method).toBe('PUT');

      req.flush(null, {
        status: HttpStatusCode.NoContent,
        statusText: 'No Content',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b']

      service.deleteQuiz(0).subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.NotFound);
          expect(err.error).toEqual(response);
          done();
        }
      });

      const req = httpTestingController.expectOne(service.url.delete(0));
      expect(req.request.method).toBe('DELETE');

      req.flush(response, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });
    });
  });

  describe('getQuizForEdit', () => {
    it('Correctly returns a response with a given body (response is ok)', (done: DoneFn) => {
      const response: IEditQuizForm = {
        id: 1,
        title: 'some title',
        description: '',
        questions: [],
      }

      service.getQuizForEdit(response.id).subscribe({
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

      const req = httpTestingController.expectOne(service.url.quizForEdit(1));
      expect(req.request.method).toBe('GET');

      req.flush(response, {
        status: HttpStatusCode.Ok,
        statusText: 'Ok',
      });
    });

    it('Correctly returns a response with a given body (response is an error)', (done: DoneFn) => {
      const response = ['a', 'b']

      service.getQuizForEdit(1).subscribe({
        next: () => {
          done.fail('Expected an error response, not a successful one');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(HttpStatusCode.Forbidden);
          done();
        }
      });

      const req = httpTestingController.expectOne(service.url.quizForEdit(1));
      expect(req.request.method).toBe('GET');

      req.flush(response, {
        status: HttpStatusCode.Forbidden,
        statusText: 'Forbidden',
      });
    });
  });    

  afterEach(() => {
    httpTestingController.verify();
  });
});
