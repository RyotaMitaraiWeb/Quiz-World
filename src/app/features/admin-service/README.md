# AdminService
An injectable service that makes HTTP calls relating to administration,
such as promoting and demoting users and obtaining logs.

## Methods
```typescript
function getModerators(): Observable<IUser[]>
```
Sends a GET request to ``/administration/moderators`` and returns a list of all users that have the Moderator role (including administrators). Each user is listed with only one role, which is their highest one.

```typescript
function getAdmins(): Observable<IUser[]>
```
Sends a GET request to ``/administration/admins`` and returns a list of all users that have the Administrator role. Each user is listed with only one role, which is their highest one.

```typescript
function getUsersByUsername(username: string): Observable<IUser[]>;
function getUsersByUsername(username: string, page: number | string): Observable<IUser[]>;
function getUsersByUsername(username: string, page: number | string, order: order): Observable<IUser[]>;
```
Sends a GET request to ``/administration/users/{username}`` and returns a list of all users that contain the given ``username`` string. Each user is listed with their highest role. Optionally, you can pass a page to specify how the result should be paginated, and how the result will be ordered. The list is ordered based entirely on the username. The default options are page 1 and an ascending order.

When passing page as a string, ensure that it is a numerical one.

```typescript
function promoteToModerator(id: number): Observable<IUser[]>
```
Sends a PUT request to ``/administration/promote/{id}``. In order for this request to work, the user must be of role ``user`` (and nothing else). The method returns an updated list of users.

```typescript
function demoteToUser(id: number): Observable<IUser[]>
```
Sends a PUT request to ``/administration/demote/{id}``. In order for this request to work, the user must be of role ``moderator`` (and nothing higher). The method returns an updated list of users.


```typescript
function getActivityLogs(): Observable<ILogActivity[]>;
function getActivityLogs(page: number | string): Observable<ILogActivity[]>;
function getActivityLogs(page: number | string, order: order): Observable<ILogActivity[]>;
```
Returns a list of logs containing moderator/admin activities, such as promotions, demotions, editing/deleting of other people's quizzes and so on, sorted by the date. Arguments can be used to control the pagination and order of the results. The default options are page 1, sorted in an ascending order.