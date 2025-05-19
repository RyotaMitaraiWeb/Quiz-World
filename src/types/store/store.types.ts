import { IMenuState } from './menu.types';
import { IUserState } from './user.types';

export interface IAppStore {
  user: IUserState;
  menu: IMenuState;
}