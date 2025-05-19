import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let headers = new HttpHeaders();

  if (token) {
    headers = headers.append('Authorization', `Bearer ${token}`);
  }

  const tokenizedRequest = req.clone({
    headers,
  });

  return next(tokenizedRequest);
};
