# app-logout-button
## Usage
<app-logout-button></app-logout-button>

Renders a hyperlink with a role of button that logs the user out upon a click. The button is tagged as an anchor for styling purposes.

## Methods
```typescript
function logout(event: Event): void
```

Attempts to log the user out. Upon success, the user's state is restarted, the user is redirected to the login page, and their localStorage token is deleted.