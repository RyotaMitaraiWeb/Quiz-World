# AdminService
An injectable service that makes HTTP calls relating to administration,
such as promoting and demoting users and obtaining logs.

## Methods
```typescript
function getModerators(): Observable<IUser[]>
```
Sends a GET request to ``/administration/moderators`` and returns a list of all users that have the Moderator role (including administrators). Each user is listed with only one role, which is their highest one.