import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthSuccessResponse } from '../../../types/responses/auth.types';
import { IAuthBody } from '../../../types/auth/general.types';
import { api } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) { }
  url = api.endpoints.auth;

  /**
   * Sends a request to ``/auth/login`` and returns an observable with the
   * response of the request
   * @param body the username and password that the user has inputted
   * @returns an Observable that resolves to the response of the request.
   */
  login(body: IAuthBody): Observable<HttpResponse<IAuthSuccessResponse>> {
    return this.http.post<IAuthSuccessResponse>(this.url.login, body, {
      observe: 'response',
      responseType: 'json',
    });
  }

  /**
   * Sends a request to ``/auth/login`` and returns an observable with the
   * response of the request
   * @param body the username and password that the user has inputted
   * @returns an Observable that resolves to the response of the request.
   */
  register(body: IAuthBody): Observable<HttpResponse<IAuthSuccessResponse>> {
    return this.http.post<IAuthSuccessResponse>(this.url.register, body, {
      observe: 'response',
      responseType: 'json',
    });
  }

  /**
   * Sends a DELETE request to ``/auth/logout`` and returns an Observable of the response.
   * @returns an Observable that resolves to the response. The component that uses this
   * method should not expect a body from this response and only work with the
   * status code.
   */
  logout(): Observable<HttpResponse<unknown>> {
    return this.http.delete(this.url.logout, {
      observe: 'response',
    });
  }
}
