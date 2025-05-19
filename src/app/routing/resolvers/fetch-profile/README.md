# fetchProfileResolver

## Usage
```typescript
function fetchProfileResolver: ResolveFn<Observable<IUserState | null>> = (route, state)
```

Fetches basic data about the user (their ID, username, and roles). This resolver can be used on any route with an ``:id`` parameter.