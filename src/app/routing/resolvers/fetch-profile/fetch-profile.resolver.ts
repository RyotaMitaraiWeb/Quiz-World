import { ResolveFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IUserState } from '../../../../types/store/user.types';
import { inject } from '@angular/core';
import { QuizService } from '../../../features/quiz-service/quiz.service';
import { order } from '../../../../types/others/lists.types';
import { AuthService } from '../../../core/auth-service/auth.service';

export const fetchProfileResolver: ResolveFn<Observable<IUserState | null>> = (route, state) => {
  const authService = inject(AuthService);
  const userId = route.paramMap.get('id') || '';

  return authService.getProfile(userId).pipe(map(res => res.body));
};
