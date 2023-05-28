import { IUserState } from '../../../types/store/user.types';
import { restartUser, setUser } from './user.action';
import { initialState, userReducer } from './user.reducer';


describe('User reducer', () => {
  it('updates on actions successfully', () => {
    const user: IUserState = {
      id: 1,
      username: 'test',
      roles: ['User'],
    };

    const setUserAction = setUser(user);

    const setUserResult = userReducer(initialState, setUserAction);
    expect(setUserResult).toEqual(user);

    const restartUserAction = restartUser();
    const restartUserResult = userReducer(setUserResult, restartUserAction);

    expect(restartUserResult).toEqual(initialState);
  });

  it('returns the default state for unknown actions', () => {
    const action = {
      type: 'Unknown',
    };

    const result = userReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});