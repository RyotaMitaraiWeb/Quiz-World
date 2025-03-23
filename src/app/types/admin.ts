import { role } from '../common/roles';

export interface AdminUserSearchResult {
  id: string;
  username: string;
  roles: role[];
}
