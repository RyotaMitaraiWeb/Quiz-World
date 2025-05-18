# fetchAllQuizzes

## Usage
```typescript
function fetchAllQuizzesResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuizList>
```
Retrieves a paginated and sorted catalogue of all quizzes. This resolver will pick up any relevant query parameters in the URL.