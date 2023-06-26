# app-login

## Usage
```html
<app-login></app-login>
```

Renders the login page. The login page allows the user to authenticate with a username and password. The login button is disabled until the user fills the two fields.

The password field also provides a button to toggle the character's visibility.

## Methods
```typescript
function togglePasswordVisibility(event: Event): void
```
Sets ``passwordIsVisible`` to the opposite boolean value.

```typescript
function login(event: Event): void;
```
Sends a request to the server to log in the user. If the login is successful, the user is redirected to the home page, the local storage is updated with the returned token, and the store is updated with the authenticated user.
