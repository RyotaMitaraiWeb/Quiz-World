# fetchQuiz

## Usage
```typescript
function fetchQuizResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResolveFn<IQuizDetails>
```
Retrieves the quiz with the given ID. The ID is retrieved from the route parameter ``id``.