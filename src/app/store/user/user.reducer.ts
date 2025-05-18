import { createReducer, on } from '@ngrx/store';
import { restartUser, setUser } from './user.action';
import { IUserState } from '../../../types/store/user.types';

export const initialState: IUserState = {
  id: '',
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
    id: '',
    username: '',
    roles: [],
  }))
);