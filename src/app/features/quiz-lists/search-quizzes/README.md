# app-search-quizzes

## Usage
```html
<app-search-quizzes></app-search-quizzes>
```

Renders an ``<app-catalogue>`` component which will display quizzes whose title contains the requested title query. The initial quizzes are taken from the route's resolved data, which will be supplied in the property ``catalogue``.

## Methods and getters
```typescript
function getResolvedData(): Observable<Data>
```
Returns the resolved data from the activated route's ``data``. This method is used to facilitate testing / mocking.

```typescript
function updateQuizzes({ page, sort, order }: { page: number, sort: sort, order: order } ): void
```
Fetches a list of quizzes from ``/quiz/search``, passing the current title query and the provided parameters as query strings to the request, and updates the ``catalogue`` property in a subscription.

```typescript
get titleQuery(): string
```
Returns the value of the query string ``query`` in the URL, or an empty string if the query is absent from the URL.

