import { ILogActivity } from '../administration/logs.types';
import { role } from '../auth/roles.types';

export interface IUser {
  index: number;
  username: string;
  id: string;
  roles: role[],
  roleButtons: role[]
}

export interface IUserResponse {
  username: string;
  id: string;
  roles: string[],
}

export interface IUserList {
  total: number;
  users: IUserResponse[];
}

export interface ILogsList {
  total: number;
  logs: ILogActivity[];
}