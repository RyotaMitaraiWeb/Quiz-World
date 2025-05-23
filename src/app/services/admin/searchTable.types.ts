import { role } from '../../common/roles';

export interface User {
  username: string;
  id: string;
  roles: role[],
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
