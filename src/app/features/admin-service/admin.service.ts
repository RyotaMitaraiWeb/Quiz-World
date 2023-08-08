import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleService } from '../../core/role-service/role.service';
import { Observable, map } from 'rxjs';
import { ILogsList, IUser, IUserList, IUserResponse } from '../../../types/responses/administration.types';
import { api } from '../../constants/api.constants';
import { role } from '../../../types/auth/roles.types';
import { roles } from '../../constants/roles.constants';
import { order, sort } from '../../../types/others/lists.types';
import { ILogActivity } from '../../../types/administration/logs.types';
import { paramsBuilder } from '../../util/params-builder/params-builder';

/**
 * An injectable service that makes HTTP calls relating to administration,
 * such as promoting and demoting users and obtaining logs.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly http: HttpClient,
    private readonly roleService: RoleService,
  ) { }

  logsUrl = api.endpoints.logs;
  rolesUrl = api.endpoints.roles;

  /**
   * Sends a GET request to ``roles/users/${role}``, retrieving a paginated and
   * ordered list of users that have the given role.
   * @param role the requested role
   * @param page the page of the query
   * @param order the order in which the users will be sorted.
   * @returns A paginated list of users, ordered by their usernames.
   */
  getUsersOfRole(role: string, page: number, order: order): Observable<IUserList>;
  /**
   * Sends a GET request to ``roles/users/${role}``, retrieving a paginated and
   * ordered list of users that have the given role.
   * @param role the requested role
   * @param page the page of the query
   * @returns A paginated list of users, ordered by their usernames in
   * an ascending order.
   */
  getUsersOfRole(role: string, page: number): Observable<IUserList>;
  /**
   * Sends a GET request to ``roles/users/${role}``, retrieving a paginated and
   * ordered list of users that have the given role.
   * @param role the requested role
   * @returns A list of users on page 1, ordered by their usernames in
   * an ascending order.
   */
  getUsersOfRole(role: string): Observable<IUserList>;
  getUsersOfRole(role: string, page?: number, order?: order): Observable<IUserList> {
    const params = paramsBuilder(page, undefined, order);
    return this.http.get<IUserList>(this.rolesUrl.getUsersOfRole(role), {
      params
    });
  }

  /**
   * Sends a GET request to ``/administration/users/{username}`` and returns a list
   * of all users that contain the given ``username`` string.
   * @param username the string by which the database will look for users.
   * @returns the first page of users, ordered by their usernames in an ascending order.
   */
  getUsersByUsername(username: string): Observable<IUserList>;
  /**
   * Sends a GET request to ``/administration/users/{username}`` and returns a list
   * of all users that contain the given ``username`` string. Each user is listed
   * with their highest role. 
   * @param username the string by which the database will look for users.
   * @param page the page for the query. When passed as string, ensure that it is a
   * numerical one.
   * @returns a list of users for the given page, ordered by their usernames in 
   * an ascending order
   */
  getUsersByUsername(username: string, page: number | string): Observable<IUserList>;
  /**
   * Sends a GET request to ``/administration/users/{username}`` and returns a list
   * of all users that contain the given ``username`` string. Each user is listed
   * with their highest role. 
   * @param username the string by which the database will look for users.
   * @param page the page for the query. When passed as string, ensure that it is a
   * numerical one.
   * @param order the order by which the users will be listed, based on their username.
   * @returns a list of users for the given page, ordered by their usernames in 
   * the specified order.
   */
  getUsersByUsername(username: string, page: number | string, order: order): Observable<IUserList>;
  getUsersByUsername(username: string, page?: number | string, order?: order): Observable<IUserList> {
    const params = paramsBuilder(page, undefined, order).append('username', username);

    return this.http
      .get<IUserList>(this.rolesUrl.getUsersOfUsername(), {
        params
      });
  }

  /**
   * Sends a PUT request to ``/roles/promote/{id}/role``.
   * @param id the user's ID.
   * @param role the role to be given to the user
   * @returns if successful, an Observable that resolves to an updated list of users
   */
  addRoleToUser(id: string, role: string): Observable<IUserList> {
    return this.http.put<IUserList>(this.rolesUrl.promote(id, role), {});
  }

  /**
   * Sends a PUT request to ``/roles/demote/{id}/role``.
   * @param id the user's ID.
   * @param role the role to be given to the user
   * @returns if successful, an Observable that resolves to an updated list of users
   */
  removeRoleFromUser(id: string, role: string): Observable<IUserList> {
    return this.http.put<IUserList>(this.rolesUrl.demote(id, role), {});
  }

  /**
   * Retrieves a list of moderator and admin activities.
   * 
   * @returns a list of log activities on page 1, sorted by title in an ascending order.
   */
  getActivityLogs(): Observable<ILogsList>;
  /**
   * Retrieves a list of moderator and admin activities.
   * @param page the page of the query
   * @returns a list of log activities on the specified page, sorted by date in an ascending order.
   */
  getActivityLogs(page: number | string): Observable<ILogsList>;
  /**
   * Retrieves a list of moderator and admin activities.
   * @param page the page of the query
   * @param order the order by which the result will be sorted.
   * @returns a list of log activities on the specified page, sorted by date in the specified order.
   */
  getActivityLogs(page: number | string, order: order): Observable<ILogsList>;
  getActivityLogs(page?: number | string, order?: order): Observable<ILogsList> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    if (order) {
      params = params.append('order', order);
    }

    return this.http.get<ILogsList>(this.logsUrl.getLogs, { params });
  }
}
