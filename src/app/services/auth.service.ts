import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserState } from '../store/user/user.store';
import { api } from '../common/api';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
    return this.http.get(this.url.usernameExists(username))
      .pipe(
        map(() => true),
        catchError(() => of(false))
    );
  }

  getProfile(userId: string) {
    return this.http.get<UserState>(this.url.profile(userId));
  }

  retrieveSession() {
    return this.http.post<SuccessfulAuthResponse>(this.url.session, undefined, {
      responseType: 'json',
    });
  }

  private _makeAuthRequest(url: string, body: AuthBody) {
    return this.http.post<SuccessfulAuthResponse>(url, body, {
      responseType: 'json'
    });
  }
}

export type AuthBody = {
  username: string;
  password: string;
};

export type SuccessfulAuthResponse = {
  token: string;
} & UserState;

