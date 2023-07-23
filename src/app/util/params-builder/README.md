# paramsBuilder
An utility function to construct pagination and sorting parameters for HTTP requests.

## Usage
```typescript
function paramsBuilder(page?: number | string, sort?: sort, order?: order): HttpParams
```
Returns an ``HttpParams`` object that has been configured with the params from the provided arguments. If a falsy value is provided in a given argument, then it is not appended to the params.

## Examples
```typescript
paramsBuilder(2, 'title', 'asc'); // will append params for page, sort, and order
paramsBuilder(undefined, 'title', 'asc') // will append params only for sort and order
paramsBuilder(page) // will append params only for page
```