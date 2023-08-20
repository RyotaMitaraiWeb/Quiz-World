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

```typescript
function isGuest(): boolean
```
Returns a boolean value that indicates whether ``userRoles`` is empty.

```typescript
function isLoggedIn(): boolean;
function isLoggedIn(strategy: 'store' | 'localStorage'): boolean;
```
Returns a boolean value that indicates whether the user is logged in or not. By default, the method determines that by checking if ``userRoles`` is empty or not. If you want this to be determined by whether the user has a JWT in the ``localStorage``, pass ``'localStorage'`` as an argument.

``localStorage`` is preferred as a strategy when used in contexts where the store is not available or the store may be initialized later. An example of this is checking if the user is logged before rendering a page (such as via a guard). Because the user state is not set until after render, using the ``store`` strategy in this scenario will always result in ``false`` (even if the store would later be initialized correctly). The ``store`` strategy is recommended when conditionally displaying elements based on whether the user is logged in due to its better reactivity.