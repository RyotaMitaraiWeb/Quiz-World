import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { determineIfUrlIsBlacklisted, UrlBlackist } from '../urlBlacklist';

const urlBlacklist: UrlBlackist = [];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const urlIsBlacklisted = determineIfUrlIsBlacklisted(req, urlBlacklist);

  if (urlIsBlacklisted) {
    return next(req);
  }

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
