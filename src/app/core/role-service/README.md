# RoleService

An injectable service to work with roles, such as verifying if the user
has a certain role and what their highest role is.

When the service is initialized via the constructor, the user's roles are set in
the ``userRoles`` property.

## Methods
```typescript
function isAdmin(): boolean
```
Returns a boolean value that indicates whether ``userRoles`` contains ``Administrator``.

```typescript
function isModerator(): boolean
```
Returns a boolean value that indicates whether ``userRoles`` contains ``Moderator``.