import { initialState } from './user.reducer';
import { selectUser, selectUserId, selectUserRoles } from './user.selector';

describe('User selectors', () => {
  it('selectUserId works', () => {
    const result = selectUserId.projector(initialState);
    expect(result).toBe('');
  });

  it('selectUserRoles works', () => {
    const result = selectUserRoles.projector(initialState);
    expect(result).toEqual([]);
  });
});