import { role } from '../auth/roles.types';

export interface IUserState {
  id: number;
  username: string;
  roles: role[];
}