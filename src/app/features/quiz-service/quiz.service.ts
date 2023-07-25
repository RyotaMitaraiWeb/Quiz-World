import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../constants/api.constants';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { Observable, Subscriber } from 'rxjs';
import { ICreatedQuizResponse, IQuizDetails } from '../../../types/responses/quiz.types';
import { IQuizList, IQuizListItem, order, sort } from '../../../types/others/lists.types';
import { paramsBuilder } from '../../util/params-builder/params-builder';

/**
 * An injectable service for managing quizzes (retrieving/creating/editing/deleting).
 */
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private readonly http: HttpClient) {  }
  url = api.endpoints.quiz;

  /**
   * Sends a POST request to ``/quiz/create`` and attaches ``quiz`` to the body.
   * @param quiz the quiz to be created
   * @returns an Observable with the response of the request. The returned result observes
   * the **response** (this allows you to perform different actions for different responses)
   * and is of type *json*
   */
  create(quiz: IQuizFormSubmission): Observable<HttpResponse<ICreatedQuizResponse>> {
    return this.http.post<ICreatedQuizResponse>(this.url.create, quiz, {
      observe: 'response',
      responseType: 'json'
    });
  }

  /**
   * Sends a GET request to ``/quiz/{id}`` where ``{id}`` is the passed argument.
   * @param id the ID of the quiz to be retrieved
   * @returns an Observable with the response of the request. The returned result observes
   * the **response** (this allows you to perform different actions for different responses)
   * and is of type *json*
   */
  getById(id: number): Observable<HttpResponse<IQuizDetails>> { 
    return this.http.get<IQuizDetails>(this.url.id(id), {
      observe: 'response',
      responseType: 'json',
    });
  }

  /**
   * Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of
   * quizzes.
   * @param page the page of the result.
   * @param sort the category by which the result will be sorted.
   * @param order the order in which the result will be sorted.
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * the specified category in the specified order.
   */
  getAllQuizzes(page?: number | string, sort?: sort, order?: order): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of
   * quizzes.
   * @returns an Observable of type ``IQuizList`` on page 1, sorted by
   * title in an ascending order.
   */
  getAllQuizzes(): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of
   * quizzes.
   * @param page the page of the result.
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * title in an ascending order.
   */
  getAllQuizzes(page: number | string): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of
   * quizzes.
   * @param page the page of the result.
   * @param sort the category by which the result will be sorted.
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * the specified category in an ascending order.
   */
  getAllQuizzes(page: number | string, sort: sort): Observable<IQuizList>;
  getAllQuizzes(page?: number | string, sort?: sort, order?: order): Observable<IQuizList> {
    const params = paramsBuilder(page, sort, order);

    return this.http.get<IQuizList>(this.url.all, {
      params,
    });
  }

  /**
   * Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of
   * quizzes that contain the given ``query``.
   * @param query the title by which the quizzes will be looked up.
   * @param page the page of the result.
   * @param sort the category by which the result will be sorted.
   * @param order the order in which the result will be sorted.
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * the specified category in the specified order.
   */
  getQuizzesByTitle(query: string, page?: number | string, sort?: sort, order?: order): Observable<IQuizList>
  /**
   * Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of
   * quizzes that contain the given ``query``.
   * @param query the title by which the quizzes will be looked up.
   * @returns an Observable of type ``IQuizList`` on page 1, sorted by
   * title in an ascending order.
   */
  getQuizzesByTitle(query: string): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of
   * quizzes that contain the given ``query``.
   * @param query the title by which the quizzes will be looked up.
   * @param page the page of the result.
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * title in an ascending order.
   */
  getQuizzesByTitle(query: string, page: number | string): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of
   * quizzes that contain the given ``query``.
   * @param query the title by which the quizzes will be looked up.
   * @param page the page of the result.
   * @param sort the category by which the result will be sorted.
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * the specified category in an ascending order.
   */
  getQuizzesByTitle(query: string, page: number | string, sort: sort): Observable<IQuizList>;
  getQuizzesByTitle(query: string, page: number | string, sort: sort, order: order): Observable<IQuizList>;
  getQuizzesByTitle(query: string, page?: number | string, sort?: sort, order?: order): Observable<IQuizList> {
    let params = paramsBuilder(page, sort, order);
    params = params.append('title', query);

    return this.http.get<IQuizList>(this.url.search, { params });
  }

  /**
   * Sends a GET request to ``/quizzes/user/{userId}`` and retrieves a sorted and paginated
   * list of the quizzes created by the user.
   * @param userId the ID of the user whose quizzes will be retrieved
   * @param page the page of the result
   * @param sort the category by which the result will be sorted
   * @param order the order in which the result will be sorted
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * the specified category in the specified order.
   */
  getUserQuizzes(userId: string, page: number | string, sort: sort, order: order): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quizzes/user/{userId}`` and retrieves a sorted and paginated
   * list of the quizzes created by the user.
   * @param userId the ID of the user whose quizzes will be retrieved
   * @param page the page of the result
   * @param sort the category by which the result will be sorted
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * the specified category in an ascending order.
   */
  getUserQuizzes(userId: string, page: number | string, sort: sort): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quizzes/user/{userId}`` and retrieves a sorted and paginated
   * list of the quizzes created by the user.
   * @param userId the ID of the user whose quizzes will be retrieved
   * @param page the page of the result
   * @returns an Observable of type ``IQuizList`` on the specified page, sorted by
   * title in an ascending order.
   */
  getUserQuizzes(userId: string, page: number | string): Observable<IQuizList>;
  /**
   * Sends a GET request to ``/quizzes/user/{userId}`` and retrieves a sorted and paginated
   * list of the quizzes created by the user.
   * @param userId the ID of the user whose quizzes will be retrieved
   * @returns an Observable of type ``IQuizList`` on page 1, sorted by
   * title in an ascending order.
   */
  getUserQuizzes(userId: string): Observable<IQuizList>;
  getUserQuizzes(userId: string, page?: number | string, sort?: sort, order?: order): Observable<IQuizList>;
  getUserQuizzes(userId: string, page?: number | string, sort?: sort, order?: order): Observable<IQuizList> {
    const params = paramsBuilder(page, sort, order);
    return this.http.get<IQuizList>(this.url.user(userId), { params });
  }

  /**
   * Sends a DELETE request to ``/quiz/{id}``.
   * @param id the ID of the quiz
   * @returns An observable that resolves to the response of the request. The
   * successful response status code is 204.
   */
  deleteQuiz(id: number): Observable<HttpResponse<unknown>> {
    return this.http.delete(this.url.delete(id), {
      observe: 'response'
    });
  }

  /**
   * Sends a PUT request to ``/quiz/{id}``, passing the provided ``quiz`` as a request body.
   * @param id the ID of the quiz
   * @param quiz the state of the new quiz.
   * @returns An observable that resolves to the response of the request. The
   * successful response status code is 204.
   */
  edit(id: number, quiz: IQuizFormSubmission): Observable<HttpResponse<unknown>> {
    return this.http.put(this.url.edit(id), quiz, { observe: 'response'});
  }
}
