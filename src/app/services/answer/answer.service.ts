import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { paramsBuilder } from '../../util/paramsBuilder';
import { GradedAnswer } from '../quiz/types';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  url = api.endpoints.answers;
  private readonly http = inject(HttpClient);

  getCorrectAnswersForQuestionById(questionId: string, version: number) {
    const params = paramsBuilder({ version });

    return this.http.get<GradedAnswer>(this.url.correctAnswersInstantMode(questionId), {
      params,
    });
  }

  getCorrectAnswersForAllQuestions(quizId: number, version: number) {
    const params = paramsBuilder({ version });

    return this.http.get<GradedAnswer[]>(this.url.correctAnswersFull(quizId), {
      params,
    });
  }
}
