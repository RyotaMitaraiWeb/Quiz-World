import { createAction, props } from '@ngrx/store';
import { IUserState } from '../../../types/store/user.types';

export const setUser = createAction('[Authentication] SetUser', props<IUserState>());
export const restartUser = createAction('[Authentication] RestartUser');