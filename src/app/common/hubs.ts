import { environment } from '../../environments/environment.development';

const root = environment.apiUrl + '/hubs';
const session = `${root}/session`;

export const hubs = {
  session,
};

export const events = {
  ReceiveCredentials: 'ReceiveCredentials',
  RoleAdded: 'RoleAdded',
  RoleRemoved: 'RoleRemoved',
};

export const actions = {};
