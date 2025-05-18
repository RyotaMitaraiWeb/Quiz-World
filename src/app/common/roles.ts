export type role = 'User' | 'Moderator' | 'Administrator';
type roleKey = 'user' | 'moderator' | 'admin';

export const roles: Record<roleKey, role> = {
  user: 'User',
  moderator: 'Moderator',
  admin: 'Administrator',
};

