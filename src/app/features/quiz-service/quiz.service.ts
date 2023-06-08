import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../constants/api.constants';
import { IQuizFormSubmission } from '../../../types/components/quiz-form.types';
import { Observable, Subscriber } from 'rxjs';
import { ICreatedQuizResponse, IQuizDetails } from '../../../types/responses/quiz.types';

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
}
