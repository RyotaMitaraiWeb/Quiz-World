import { CanActivateFn } from '@angular/router';
import { IQuizDetails } from '../../../../types/responses/quiz.types';
import { inject } from '@angular/core';
import { RoleService } from '../../../core/role-service/role.service';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { selectUserId } from '../../../store/user/user.selector';
import { map } from 'rxjs';

export const canEditQuizGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService);
  if (roleService.isModerator()) {
    return true;
  }

  const quiz = route.data['quiz'] as IQuizDetails;
  const store = inject(Store<IAppStore>);

  return store.select(selectUserId).pipe(map(id => id === quiz.creatorId));
};
