import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleService } from '../../core/role-service/role.service';
import { Observable, map } from 'rxjs';
import { IUser, IUserResponse } from '../../../types/responses/administration.types';
import { api } from '../../constants/api.constants';
import { role } from '../../../types/auth/roles.types';
import { roles } from '../../constants/roles.constants';

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
  
  url = api.endpoints.administration;

  /**
   * Sends a GET request to ``/administration/moderators`` and returns a list
   * of all users that have the Moderator role (including administrators).
   * Each user is listed with only one role, which is their highest one.
   * @returns an Observable that resolves to an array of ``IUser``.
   */
  getModerators(): Observable<IUser[]> {
    return this.http.get<IUserResponse[]>(this.url.getModerators)
    .pipe(
      map(users => users.map(this.mapUserToHighestRole))
    );
  }

  private mapUserToHighestRole(user: IUserResponse): IUser {
    const { id, username } = user;
    if (user.roles.includes(roles.admin)) {
      return { id, username, role: roles.admin, };
    }

    if (user.roles.includes(roles.moderator)) {
      return { id, username, role: roles.moderator, };
    }

    if (user.roles.includes(roles.user)) {
      return { id, username, role: roles.user, };
    }

    throw new Error('User does not have any of the valid roles');
  }
}
