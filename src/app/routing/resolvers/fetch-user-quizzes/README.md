# fetchUserQuizzes

## Usage
```typescript
function fetchUserQuizzesResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuizList>
```
Retrieves a paginated and sorted catalogue of the user's quizzes. This resolver will pick up any relevant query parameters in the URL. The user's id is picked up via an ``id`` route parameter.