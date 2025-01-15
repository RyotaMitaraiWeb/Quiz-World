import { role } from "../../common/roles";

export type User = {
  index: number;
  username: string;
  id: string;
  roles: role[],
  roleButtons: role[]
}

export type UserResponse = {
  username: string;
  id: string;
  roles: string[],
}

export type UserList = {
  total: number;
  users: User[];
}
