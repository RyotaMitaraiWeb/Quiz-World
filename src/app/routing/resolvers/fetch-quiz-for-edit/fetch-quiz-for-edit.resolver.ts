import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { IEditQuizForm } from '../../../../types/components/quiz-form.types';

export const fetchQuizForEditResolver: ResolveFn<Observable<IEditQuizForm | null>> = (route, state): Observable<IEditQuizForm | null> => {
  const quizService = inject(QuizService);
  const id = Number(route.paramMap.get('id'));

  return quizService.getQuizForEdit(id)
    .pipe(
      map(res => res.body),
    );
};
