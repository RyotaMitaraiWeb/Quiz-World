import { CanActivateFn } from '@angular/router';
import { IQuizDetails } from '../../../../types/responses/quiz.types';
import { inject } from '@angular/core';
import { RoleService } from '../../../core/role-service/role.service';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { selectUserId } from '../../../store/user/user.selector';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { QuizService } from '../../../features/quiz-service/quiz.service';

export const canEditQuizGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const quizService = inject(QuizService);
  const id = Number(route.paramMap.get('id'));
    
  return quizService.getQuizForEdit(id)
    .pipe(
      map(res => res.body),
      tap(quiz => {
        route.data = {};
        route.data['quiz'] = quiz;
      }),
    )
    .pipe(
      map(() => true),
      catchError(
        () => of(false)
      )
    );
};
