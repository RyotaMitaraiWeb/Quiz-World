import { createSelector } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { IUserState } from '../../../types/store/user.types';

export const selectUser = (state: IAppStore) => state.user;

export const selectUserId = createSelector(
  selectUser,
  (state: IUserState) => state.id,
);

export const selectUserRoles = createSelector(
  selectUser,
  (state: IUserState) => state.roles,
);