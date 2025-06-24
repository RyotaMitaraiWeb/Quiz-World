import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { paramsBuilder } from '../../util/paramsBuilder';
import { GradedAnswer } from '../quiz/types';
import { skipRedirectOnResponseHeader } from '../../interceptors/redirect-on-error/redirect-on-error.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  url = api.endpoints.answers;
  private readonly http = inject(HttpClient);

  private readonly skip404Redirect = skipRedirectOnResponseHeader(HttpStatusCode.NotFound);


  getCorrectAnswersForQuestionById(questionId: string, version: number) {
    const params = paramsBuilder({ version });
    const headers = new HttpHeaders(this.skip404Redirect);

    return this.http.get<GradedAnswer>(this.url.correctAnswersInstantMode(questionId), {
      params,
      headers,
    });
  }

  getCorrectAnswersForAllQuestions(quizId: number, version: number) {
    const params = paramsBuilder({ version });
const headers = new HttpHeaders(this.skip404Redirect);
    return this.http.get<GradedAnswer[]>(this.url.correctAnswersFull(quizId), {
      params,
      headers,
    });
  }
}
