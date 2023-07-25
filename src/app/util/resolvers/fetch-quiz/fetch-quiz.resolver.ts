import { ResolveFn } from '@angular/router';
import { IQuizDetails } from '../../../../types/responses/quiz.types';
import { inject } from '@angular/core';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { Observable, map } from 'rxjs';

export const fetchQuizResolver: ResolveFn<IQuizDetails> = (route, state): Observable<IQuizDetails> => {
  const quizService = inject(QuizService);
  const id = Number(route.paramMap.get('id'));
  return quizService.getById(id).pipe(map(res => res.body!));
};
