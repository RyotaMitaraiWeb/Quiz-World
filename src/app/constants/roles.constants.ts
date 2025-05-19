import { IRoles, role } from '../../types/auth/roles.types';

/**
 * Roles determine what actions each user can perform. These are the following permissions:
 * * **User:** default role for a logged in user. Users can create quizzes and edit/delete
 * their own ones.
 * * **Moderator:** moderators can edit and delete any deck, regardless of 
 * authorship. Editing and deleting other people's quizzes is logged.
 * * **Administrator:** administrators can promote users to moderators and demote
 * moderators to users. They can also check the moderator activity logs. Administrators
  editing / deleting other users' quizzes is also logged.
 */
export const roles: IRoles = {
  user: 'User',
  moderator: 'Moderator' ,
  admin: 'Administrator',
};