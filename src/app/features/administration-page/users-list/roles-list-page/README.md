# app-roles-list-page

## Usage
```html
<app-roles-list-page></app-roles-list-page>
```

Renders a page that shows users of a certain role. The role is determined by a route variable called ``role``. 

## Methods and getters
```typescript
function getRouteParams(): Observable<ParamMap>
```
Returns the route params map. Used for easier spying in tests.

```typescript
get pageRole(): Observable<role>
```
Returns the requested role for the given page. The role is taken from the route parameter ``role`` and mapped to the respective value by referencing the ``formattedRoles`` property.

```typescript
function updateUsers(page: number, order: order): void
```
Updates the ``userList$`` observable with data from the server.


```typescript
function changePage(page: number)
```
Updates the ``userList$`` observable with data from the server from the given page.

```typescript
function changeOrder(order: string)
```
Updates the ``userList$`` observable with data from the server in the given order.