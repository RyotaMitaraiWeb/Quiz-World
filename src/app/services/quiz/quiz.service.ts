import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { CreatedQuizResponse, EditQuizForm, QuizDetails, QuizList, type QuizFormSubmission } from './types';
import { paramsBuilder } from '../../util/paramsBuilder';
import { SearchQuizParameters } from '../../types/search';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly http = inject(HttpClient);

  url = api.endpoints.quiz;

  static emptyQuiz: QuizDetails = {
    id: 0,
    title: '',
    description: '',
    instantMode: false,
    questions: [],
    creatorId: '',
    creatorUsername: '',
    version: 0,
    createdOn: '',
    updatedOn: '',
  };

  search(searchParameters: SearchQuizParameters) {
    const params = paramsBuilder(searchParameters);

    return this.http.get<QuizList>(this.url.browse, { params });
  }

  create(quiz: QuizFormSubmission) {
    return this.http.post<CreatedQuizResponse>(this.url.create, quiz);
  }

  getById(id: number) {
    return this.http.get<QuizDetails>(this.url.id(id));
  }

  deleteQuiz(id: number) {
    return this.http.delete(this.url.delete(id));
  }

  edit(id: number, quizToEdit: QuizFormSubmission) {
    return this.http.put(this.url.edit(id), quizToEdit);
  }

  /**
   * Retrieves data for the quiz so that it can be filled in the edit form.
   * @param id
   * @returns
   */
  getQuizForEdit(id: number) {
    return this.http.get<EditQuizForm>(this.url.quizForEdit(id));
  }
}
