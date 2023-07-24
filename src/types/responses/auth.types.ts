import { role } from '../auth/roles.types';

export interface IAuthSuccessResponse {
  token: string;
  id: string;
  username: string;
  roles: role[]
}