import { role } from '../auth/roles.types';

export interface IUserState {
  id: string;
  username: string;
  roles: role[];
}