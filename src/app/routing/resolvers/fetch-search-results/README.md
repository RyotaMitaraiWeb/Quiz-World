# fetchSearchResults

## Usage
```typescript
function fetchSearchResults(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuizList>
```
Retrieves a paginated and sorted catalogue of quizzes that contain the given ``query`` in their title. This resolver will pick up any relevant query parameters in the URL.