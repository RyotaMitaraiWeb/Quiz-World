import { role } from '../../common/roles';

export interface User {
  index: number;
  username: string;
  id: string;
  roles: role[],
  roleButtons: role[]
}

export interface UserResponse {
  username: string;
  id: string;
  roles: string[],
}

export interface UserList {
  total: number;
  users: User[];
}
