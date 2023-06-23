import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGradedAnswer, ISessionAnswer } from '../../../types/responses/quiz.types';
import { api } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  url = api.endpoints.answers;

  constructor(private readonly http: HttpClient) { }

  /**
   * Sends a GET request to ``/answers/{questionId}/instant`` and retrieves the question's
   * correct answers. This method is meant to be used in quizzes in instant mode.
   * @param questionId the ID of the question
   * @returns an Observable of the response which holds the response body of type JSON.
   */
  getCorrectAnswersForQuestionById(questionId: number): Observable<HttpResponse<ISessionAnswer[]>> {
    return this.http.get<ISessionAnswer[]>(this.url.correctAnswersInstantMode(questionId), {
      observe: 'response',
      responseType: 'json',
    });
  }

  /**
   * Sends a GET request to ``/answers/{quizId}/full`` and retrieves all correct answers
   * for each question. This method is meant to be used in quizzes NOT in instant mode.
   * @param quizId the ID of the quiz
   * @returns an Observable of the response which holds the response body of type JSON.
   */
  getCorrectAnswersForAllQuestions(quizId: number): Observable<HttpResponse<IGradedAnswer[]>> {        
    return this.http.get<IGradedAnswer[]>(this.url.correctAnswersFull(quizId), {
      observe: 'response',
      responseType: 'json',
    });
  }
}
