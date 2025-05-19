# fetchQuizForEditResolver

## Usage
```typescript
function fetchQuizForEditResolver: ResolveFn<Observable<IEditQuizForm | null>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEditQuizForm | null>
```
Retrieves all details that can be edited for a quiz. This resolver can be used on any route with an ``:id`` route parameter.