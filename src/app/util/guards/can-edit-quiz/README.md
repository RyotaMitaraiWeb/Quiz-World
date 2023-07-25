# canEditQuizGuard
## Usage
```typescript
function canEditQuizGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouteStateSnapshot)
```

Returns ``true`` if the user is a moderator or an observable that resolves to a boolean value that indicates whether the user is the creator of the quiz or not.