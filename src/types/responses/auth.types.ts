import { role } from '../auth/roles.types';

export interface IAuthSuccessResponse {
  token: string;
  id: number;
  username: string;
  roles: role[]
}