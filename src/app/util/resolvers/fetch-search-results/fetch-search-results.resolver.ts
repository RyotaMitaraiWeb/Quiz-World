import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { IQuizList, order, sort } from '../../../../types/others/lists.types';
import { Observable } from 'rxjs';
import { paramsBuilder } from '../../params-builder/params-builder';

/**
 * Retrieves a catalogue of all quizzes whose title contains the given ``query`` so that they can be loaded before navigating
 * to the page.
 * @param route 
 * @param state 
 * @returns 
 */
export const fetchSearchResults: ResolveFn<IQuizList> = (route, state): Observable<IQuizList> => {
  const quizService = inject(QuizService);

  const page = Number(route.queryParamMap.get('page'));
  const sort = route.queryParamMap.get('sort') as sort;
  const order = route.queryParamMap.get('order') as order;
  const search = route.queryParamMap.get('query') || '';

  const params = paramsBuilder(page, sort, order);

  return quizService.getQuizzesByTitle(
    search,
    Number(params.get('page')),
    params.get('sort') as sort,
    params.get('order') as order,
  );
};
