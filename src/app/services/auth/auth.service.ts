import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { catchError, map, of } from 'rxjs';
import type { AuthBody, SuccessfulAuthResponse } from './types';
import { skipRedirectOnResponseHeader } from '../../interceptors/redirect-on-error/redirect-on-error.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly skip401Redirect = skipRedirectOnResponseHeader(HttpStatusCode.Unauthorized);
  private readonly skip404Redirect = skipRedirectOnResponseHeader(HttpStatusCode.NotFound);
  url = api.endpoints.auth;

  login(body: AuthBody) {
    return this._makeAuthRequest(this.url.login, body);
  }

  register(body: AuthBody) {
    return this._makeAuthRequest(this.url.register, body);
  }

  logout() {
    return this.http.delete(this.url.logout);
  }

  checkIfUsernameExists(username: string) {
    const params = new HttpParams().append('username', username);
    const headers = new HttpHeaders(this.skip404Redirect);
    return this.http.get(this.url.usernameExists, { params, headers })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
    );
  }

  retrieveSession() {
    return this.http.post<SuccessfulAuthResponse>(this.url.session, undefined, {
      responseType: 'json',
    });
  }

  private _makeAuthRequest(url: string, body: AuthBody) {
    const headers = new HttpHeaders(this.skip401Redirect);
    return this.http.post<SuccessfulAuthResponse>(url, body, {
      responseType: 'json',
      headers,
    });
  }
}

