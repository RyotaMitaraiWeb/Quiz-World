import { HttpRequest } from '@angular/common/http';

type UrlMatchFn = (url: string) => boolean;

export type UrlBlackist = (string | UrlMatchFn)[];

export function determineIfUrlIsBlacklisted<T>(req: HttpRequest<T>, urlBlacklist: UrlBlackist) {
  const reqUrl = req.url;

  for (const url of urlBlacklist) {
    if (typeof url === 'function') {
      if (url(reqUrl)) {
        return true;
      }
    } else {
      if (url === reqUrl) {
        return true;
      }
    }
  }

  return false;
}