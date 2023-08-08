# AdminService
An injectable service that makes HTTP calls relating to administration,
such as promoting and demoting users and obtaining logs.

## Methods
```typescript
function getUsersOfRole(role: string, page: number, order: order): Observable<IUserList>;
function getUsersOfRole(role: string, page: number): Observable<IUserList>;
function getUsersOfRole(role: string): Observable<IUserList>;
function getUsersOfRole(role: string, page?: number, order?: order): Observable<IUserList>
```
Sends a GET request to ``/roles/users/{role}`` and returns a list of all users that have the specified ``role``. ``page`` and ``order`` determine how to paginate and order it. Users are ordered by their usernames. Default values are ``1`` and ``desc``.

```typescript
function getUsersByUsername(username: string): Observable<IUser[]>;
function getUsersByUsername(username: string, page: number | string): Observable<IUser[]>;
function getUsersByUsername(username: string, page: number | string, order: order): Observable<IUser[]>;
```
Sends a GET request to ``/roles/users/{username}`` and returns a list of all users whose username contains the given ``username``. Optionally, you can pass a page to specify how the result should be paginated, and how the result will be ordered. The list is ordered based entirely on the username. The default options are page 1 and an ascending order.

When passing page as a string, ensure that it is a numerical one.

```typescript
function addRoleToUser(id: string, role: string): Observable<IUserList>
```
Sends a PUT request to ``/roles/promote/{id}/role`` and returns an updated list of users.

```typescript
function removeRoleFromUser(id: string, role: string): Observable<IUserList>
```
Sends a PUT request to ``/roles/demote/{id}/role`` and returns an updated list of users.


```typescript
function getActivityLogs(): Observable<ILogActivity[]>;
function getActivityLogs(page: number | string): Observable<ILogActivity[]>;
function getActivityLogs(page: number | string, order: order): Observable<ILogActivity[]>;
```
Returns a list of logs containing moderator/admin activities, such as promotions, demotions, editing/deleting of other people's quizzes and so on, sorted by the date. Arguments can be used to control the pagination and order of the results. The default options are page 1, sorted in an ascending order.