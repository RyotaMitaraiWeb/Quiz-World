import { role } from '../auth/roles.types';

export interface IUser {
  username: string;
  id: number;
  role: role,
}

export interface IUserResponse {
  username: string;
  id: number;
  roles: role[],
}