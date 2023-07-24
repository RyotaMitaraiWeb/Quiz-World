import { role } from '../auth/roles.types';

export interface IUser {
  username: string;
  id: string;
  role: role,
}

export interface IUserResponse {
  username: string;
  id: string;
  roles: role[],
}