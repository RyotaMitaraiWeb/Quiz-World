import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleService } from '../../core/role-service/role.service';
import { Observable, map } from 'rxjs';
import { IUser, IUserResponse } from '../../../types/responses/administration.types';
import { api } from '../../constants/api.constants';
import { role } from '../../../types/auth/roles.types';
import { roles } from '../../constants/roles.constants';
import { order, sort } from '../../../types/others/lists.types';
import { ILogActivity } from '../../../types/administration/logs.types';

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
   * Sends a GET request to ``/administration/moderators`` and returns a list
   * of all users that have the Moderator role (including administrators).
   * @returns an Observable that resolves to an array of ``IUser``.
   */
  getModerators(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.rolesUrl.getUsersOfRole(roles.moderator));
  }

  /**
   * Sends a GET request to ``/administration/admins`` and returns a list
   * of all users that have the Administrator role.
   * @returns an Observable that resolves to an array of ``IUser``.
   */
  getAdmins(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.rolesUrl.getUsersOfRole(roles.admin))
      
  }

  /**
   * Sends a GET request to ``/administration/users/{username}`` and returns a list
   * of all users that contain the given ``username`` string.
   * @param username the string by which the database will look for users.
   * @returns the first page of users, ordered by their usernames in an ascending order.
   */
  getUsersByUsername(username: string): Observable<IUser[]>;
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
  getUsersByUsername(username: string, page: number | string): Observable<IUser[]>;
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
  getUsersByUsername(username: string, page: number | string, order: order): Observable<IUser[]>;
  getUsersByUsername(username: string, page?: number | string, order?: order): Observable<IUser[]> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    if (order) {
      params = params.append('order', order);
    }

    return this.http
      .get<IUser[]>(this.rolesUrl.getUsersOfUsername(username), {
        params
      });
  }

  /**
   * Sends a PUT request to ``/administration/promote/{id}``. In order for this
   * request to work, the user must be of role ``user``.
   * @param id the ID of the user to be promoted to a Moderator
   * @returns an Observable of type ``IUser[]``. You can use this to update
   * the list of users after the response resolves.
   */
  promoteToModerator(id: string): Observable<IUser[]> {
    return this.http.put<IUser[]>(this.rolesUrl.promote(id, roles.moderator), {});
  }

  /**
   * Sends a PUT request to ``/administration/demote/{id}``. In order for this
   * request to work, the user must be of role ``moderator``.
   * @param id the ID of the moderator to be demoted to user.
   * @returns an Observable of type ``IUser[]``. You can use this to update
   * the list of users after the response resolves.
   */
  demoteToUser(id: string): Observable<IUser[]> {
    return this.http.put<IUser[]>(this.rolesUrl.demote(id, roles.moderator), {});
  }

  /**
   * Retrieves a list of moderator and admin activities.
   * 
   * @returns a list of log activities on page 1, sorted by title in an ascending order.
   */
  getActivityLogs(): Observable<ILogActivity[]>;
  /**
   * Retrieves a list of moderator and admin activities.
   * @param page the page of the query
   * @returns a list of log activities on the specified page, sorted by date in an ascending order.
   */
  getActivityLogs(page: number | string): Observable<ILogActivity[]>;
  /**
   * Retrieves a list of moderator and admin activities.
   * @param page the page of the query
   * @param order the order by which the result will be sorted.
   * @returns a list of log activities on the specified page, sorted by date in the specified order.
   */
  getActivityLogs(page: number | string, order: order): Observable<ILogActivity[]>;
  getActivityLogs(page?: number | string, order?: order): Observable<ILogActivity[]> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }

    if (order) {
      params = params.append('order', order);
    }

    return this.http.get<ILogActivity[]>(this.logsUrl.getLogs, { params });
  }
}
