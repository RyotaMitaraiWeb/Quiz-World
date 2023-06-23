# AuthService
An injectable service to manage authentication (register, login, logout, and others).

## Methods
```typescript
function login(body: IAuthBody): Observable<HttpResponse<IAuthSuccessResponse>>
```
Sends a POST request to ``/auth/login`` and returns an observable with the response of the request. ``body`` represents the user's username and password.

```typescript
function register(body: IAuthBody): Observable<HttpResponse<IAuthSuccessResponse>>
```
Sends a POST request to ``/auth/register`` and returns an observable with the response of the request. ``body`` represents the user's username and password.

```typescript
function logout(): Observable<HttpResponse<unknown>>
```
Sends a DELETE request to ``/auth/logout`` and returns an Observable of the response. The component that is using this method should not be expecting a response body and only work with the status code.

```typescript
function usernameExists(username: string): Observable<HttpResponse<unknown>>
```
Sends a GET request to ``/auth/username/{username}`` and returns an Observable
that holds the response. The component that relies on the method should work with the status code only.
