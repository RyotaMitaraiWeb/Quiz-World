# User state
Contains information about the user

## Usage
```typescript
interface IUserState {
  id: number;
  username: string;
  roles: role[];
}
```

```typescript
const initialState: IUserState = {
  id: 0,
  username: '',
  roles: [],
}
```
The user state is composed of three main properties:
- ``id`` - Use cases for this property includes checking if the user is the creator of a given quiz, checking if the user is logged in, etc.
- ``username`` - This property is typically used for presentation purposes and rarely plays a major role.
- ``roles`` - A user's roles determine what actions they can perform. Those are the following roles:
- - **User:** default role for a logged in user. Users can create quizzes and edit/delete their own ones.
- - **Moderator:** moderators can edit and delete any deck, regardless of 
 authorship. Editing and deleting other people's quizzes is logged.
- - **Administrator:** administrators can promote users to moderators and demote
 moderators to users. They can also check the moderator activity logs. Administrators
editing / deleting other users' quizzes is also logged.

Logged in users can have multiple roles (so for example, if you want to check if the user can edit someone else's deck, all you need is to see if they have the ``Moderator`` role).

Guests, by default, have the initial state.

## Actions
```typescript
setUser({
  id: 1,
  username: 'some username',
  roles: ['User', 'Moderator']
})
```

```typescript
restartUser() // sets the state to the initial state
```

## Selectors
```typescript
selectUserId()
```
Returns the user's ``id``.


```typescript
selectUserRoles()
```
Returns the user's ``roles``.