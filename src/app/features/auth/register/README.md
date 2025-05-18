# app-register

## Usage
```html
<app-register></app-register>
```

Renders the register page. The register page allows the user to authenticate with a username and password. The register button is disabled until the fields are valid.

The following validations are applied to the fields:
* **username**
* * required
* * minimum length of 5 characters
* * maximum length of 15 characters
* * must be alphanumeric (meaning that it must consist solely of English letters and/or numbers)
* * the username must not have been taken by another user already (this is achieved with the ``UniqueUsernameValidator``). Note that this validation is debounced, so it will take a small moment for the validation to apply.
* **pasword**
* * required
* * minimum length of 6 characters

The password field also provides a button to toggle the characters' visibility.

## Methods
```typescript
function togglePasswordVisibility(event: Event): void
```
Sets ``passwordIsVisible`` to the opposite boolean value.

```typescript
function register(event: Event): void;
```
Sends a request to the server to register the user. If the register is successful, the user is redirected to the home page, the local storage is updated with the returned token, and the store is updated with the authenticated user.
