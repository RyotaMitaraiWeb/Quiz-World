import { IMenuState } from '../../../types/store/menu.types';
import { closeMenu, openMenu } from './menu.action';
import { initialState, menuReducer } from './menu.reducer';

describe('Menu reducer', () => {
  it('Updates on action successfully', () => {
    const openMenuAction = openMenu();
    const openMenuResult = menuReducer(initialState, openMenuAction);

    expect(openMenuResult).toEqual({ open: true });
    
    const closeMenuAction = closeMenu();
    const closeMenuResult = menuReducer(openMenuResult, closeMenuAction);
    expect(closeMenuResult).toEqual({ open: false });
  });

  it('returns the default state for unknown actions', () => {
    const action = {
      type: 'Unknown',
    };

    const result = menuReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});