import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { CreatedQuizResponse, EditQuizForm, QuizList, type QuizFormSubmission } from './types';
import { paramsBuilder } from '../../util/paramsBuilder';
import { SearchOptions } from '../../types/search';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly http = inject(HttpClient);

  url = api.endpoints.quiz;

  create(quiz: QuizFormSubmission, options?: SearchOptions) {
    const params = paramsBuilder(options);

    return this.http.post<CreatedQuizResponse>(this.url.create, quiz, {
      params,
    });
  }

  getQuizzesByTitle(query: string, options?: SearchOptions) {
    let params = paramsBuilder(options);
    params = params.append('search', query);

    return this.http.get<QuizList>(this.url.search, { params });
  }

  getAllQuizzes(options?: SearchOptions) {
    const params = paramsBuilder(options);

    return this.http.get<QuizList>(this.url.all, { params });
  }

  getUserQuizzes(userId: string, options?: SearchOptions) {
    const params = paramsBuilder(options);

    return this.http.get<QuizList>(this.url.user(userId), { params });
  }

  deleteQuiz(id: number) {
    return this.http.delete(this.url.delete(id));
  }

  edit(id: number, quizToEdit: EditQuizForm) {
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
