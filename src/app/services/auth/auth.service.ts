import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { catchError, map, of } from 'rxjs';
import type { AuthBody, SuccessfulAuthResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
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
    return this.http.get(this.url.usernameExists, { params })
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
    return this.http.post<SuccessfulAuthResponse>(url, body, {
      responseType: 'json',
    });
  }
}

