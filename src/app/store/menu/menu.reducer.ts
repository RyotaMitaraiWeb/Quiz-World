import { createReducer, on } from '@ngrx/store';
import { IMenuState } from '../../../types/store/menu.types';
import { closeMenu, openMenu } from './menu.action';

export const initialState: IMenuState = {
  open: false,
};

export const menuReducer = createReducer(
  initialState,
  on(openMenu, () => ({
    open: true,
  })),
  on(closeMenu, () => ({
    open: false,
  }))
);