# app-user-quizzes-component

## Usage
```html
<app-user-quizzes></app-user-quizzes>
```

Renders an ``<app-catalogue>`` component which will display quizzes that were created by the specific user. The initial quizzes are taken from the route's resolved data, which will be supplied in the property ``profile.quizzes``. The user's ``id``, ``roles``, and ``username`` are also available via the ``profile`` property.

## Methods
```typescript
function getResolvedData(): Observable<Data>
```
Returns the resolved data from the activated route's ``data``. This method is used to facilitate testing / mocking.

```typescript
function updateQuizzes({ page, sort, order }: { page: number, sort: sort, order: order } ): void
```
Fetches a list of quizzes from ``/quiz/user/{userId}``, passing the provided parameters as query strings to the request, and updates the ``catalogue`` property in a subscription.

