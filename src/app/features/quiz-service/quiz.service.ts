import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../constants/api.constants';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { Observable, Subscriber } from 'rxjs';
import { ICreatedQuizResponse, IQuizDetails } from '../../../types/responses/quiz.types';
import { IQuizListItem, order, sort } from '../../../types/others/lists.types';
import { paramsBuilder } from '../../../util/params-builder/params-builder';

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
   * @returns an Observable of type ``IQuizListItem[]`` on the specified page, sorted by
   * the specified category in the specified order.
   */
  getAllQuizzes(page?: number | string, sort?: sort, order?: order): Observable<IQuizListItem[]>;
  /**
   * Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of
   * quizzes.
   * @returns an Observable of type ``IQuizListItem[]`` on page 1, sorted by
   * title in an ascending order.
   */
  getAllQuizzes(): Observable<IQuizListItem[]>;
  /**
   * Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of
   * quizzes.
   * @param page the page of the result.
   * @returns an Observable of type ``IQuizListItem[]`` on the specified page, sorted by
   * title in an ascending order.
   */
  getAllQuizzes(page: number | string): Observable<IQuizListItem[]>;
  /**
   * Sends a GET request to ``/quiz/all`` and retrieves a paginated and sorted list of
   * quizzes.
   * @param page the page of the result.
   * @param sort the category by which the result will be sorted.
   * @returns an Observable of type ``IQuizListItem[]`` on the specified page, sorted by
   * the specified category in an ascending order.
   */
  getAllQuizzes(page: number | string, sort: sort): Observable<IQuizListItem[]>;
  getAllQuizzes(page?: number | string, sort?: sort, order?: order): Observable<IQuizListItem[]> {
    const params = paramsBuilder(page, sort, order);

    return this.http.get<IQuizListItem[]>(this.url.all, {
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
   * @returns an Observable of type ``IQuizListItem[]`` on the specified page, sorted by
   * the specified category in the specified order.
   */
  getQuizzesByTitle(query: string, page?: number | string, sort?: sort, order?: order): Observable<IQuizListItem[]>
  /**
   * Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of
   * quizzes that contain the given ``query``.
   * @param query the title by which the quizzes will be looked up.
   * @returns an Observable of type ``IQuizListItem[]`` on page 1, sorted by
   * title in an ascending order.
   */
  getQuizzesByTitle(query: string): Observable<IQuizListItem[]>;
  /**
   * Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of
   * quizzes that contain the given ``query``.
   * @param query the title by which the quizzes will be looked up.
   * @param page the page of the result.
   * @returns an Observable of type ``IQuizListItem[]`` on the specified page, sorted by
   * title in an ascending order.
   */
  getQuizzesByTitle(query: string, page: number | string): Observable<IQuizListItem[]>;
  /**
   * Sends a GET request to ``/quiz/search`` and retrieves a paginated and sorted list of
   * quizzes that contain the given ``query``.
   * @param query the title by which the quizzes will be looked up.
   * @param page the page of the result.
   * @param sort the category by which the result will be sorted.
   * @returns an Observable of type ``IQuizListItem[]`` on the specified page, sorted by
   * the specified category in an ascending order.
   */
  getQuizzesByTitle(query: string, page: number | string, sort: sort): Observable<IQuizListItem[]>;
  getQuizzesByTitle(query: string, page?: number | string, sort?: sort, order?: order): Observable<IQuizListItem[]> {
    let params = paramsBuilder(page, sort, order);
    params = params.append('title', query);

    return this.http.get<IQuizListItem[]>(this.url.search, { params });
  }
}
