# app-profile

## Usage
```html
<app-profile></app-profile>
```

Renders a page that displays basic info about the viewed user (username and their roles). The viewed user's data is retrieved from the route's ``data``. If the user viewing the page is an administrator, they will be able to see an area called "Admin actions", which allows the administrator to change the viewed user's role. Changing the user's role will result in the administrator being redirected to the activity logs page.

In addition, the general area provides a link to the viewed user's quizzes, which can be paginated and sorted.

## Methods
```typescript
function getResolvedData(): Observable<Data>
```
Returns the resolved ``data`` from the route. Used for easier spying in tests.