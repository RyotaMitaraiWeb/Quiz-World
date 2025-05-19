import { role } from '../auth/roles.types';

export interface IUserProfile {
  id: string;
  username: string;
  roles: role[],
}