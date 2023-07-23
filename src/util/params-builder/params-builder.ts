import { HttpParams } from '@angular/common/http';
import { order, sort } from '../../types/others/lists.types';

/**
 * Returns an ``HttpParams`` object that has been configured 
 * with the params from the provided arguments. If a falsy value is provided in 
 * a given argument, then it is not appended to the params.
 * 
 * ## Examples
  ```typescript
  paramsBuilder(2, 'title', 'asc'); // will append params for page, sort, and order
  paramsBuilder(undefined, 'title', 'asc') // will append params only for sort and order
  paramsBuilder(page) // will append params only for page
  ```
 * @param page the page of the result
 * @param sort category by which the result will be sorted
 * @param order the order of the result
 * @returns an ``HttpParams`` object with appended params of all provided options.
 */
export function paramsBuilder(page?: number | string, sort?: sort, order?: order): HttpParams {
  let params = new HttpParams();

  if (page) {
    params = params.append('page', page);
  }

  if (sort) {
    params = params.append('sort', sort);
  }

  if (order) {
    params = params.append('order', order);
  }

  return params;
}