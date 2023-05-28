import { createReducer, on } from '@ngrx/store';
import { restartUser, setUser } from './user.action';
import { IUserState } from '../../../types/store/user.types';

export const initialState: IUserState = {
  id: 0,
  username: '',
  roles: [],
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (_state, user) => ({
    id: user.id,
    username: user.username,
    roles: user.roles,
  })),
  on(restartUser, () => ({
    id: 0,
    username: '',
    roles: [],
  }))
);