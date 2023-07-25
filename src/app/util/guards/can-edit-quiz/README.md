# canEditQuizGuard
## Usage
```typescript
function canEditQuizGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouteStateSnapshot)
```

Returns an observable that resolves to a boolean value that indicates whether the user can access the edit page. If the user can access the edit page, the guard will also supply the form data in the ``quiz`` property of the route data.