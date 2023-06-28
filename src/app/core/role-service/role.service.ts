import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { role } from '../../../types/auth/roles.types';
import { selectUserRoles } from '../../store/user/user.selector';
import { roles } from '../../constants/roles.constants';

/**
 * An injectable service to work with roles, such as verifying if the user
 * has a certain role and what their highest role is.
 * 
 * When the service is initialized via the constructor, the user's roles are set in
 * the ``userRoles`` property.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private readonly store: Store<IAppStore>) {
    store.select(selectUserRoles).subscribe(roles => {
      this.userRoles = roles;
    });
  }

  userRoles: role[] = [];

  isAdmin(): boolean {
    return this.userRoles.includes(roles.admin);
  }

  isModerator(): boolean {
    return this.userRoles.includes(roles.moderator);
  }

  isGuest(): boolean {
    return this.userRoles.length === 0;
  }


  /**
   * Returns a boolean value that indicates whether the user is logged in or not.
   * By default, the method determines that by checking if ``userRoles`` is empty
   * or not.
   * If you want this to be determined by whether the user has a JWT in the
   * ``localStorage``, pass ``'localStorage'`` as an argument.
   * 
   * It's recommended to use the store strategy whenever possible.
   * @returns a boolean value that indicates whether the user is logged in or not.
   */
  isLoggedIn(): boolean;
  /**
   * @param strategy how to determine if the user is logged it or not. ``store``
   * will make the method check the ``userRoles`` (which is derived from the store).
   * ``localStorage`` will make the method check if ``localStorage`` contains
   * a ``token`` key. Using ``store`` is recommended whenever possible.
   */
  isLoggedIn(strategy: 'store' | 'localStorage'): boolean;
  isLoggedIn(strategy: 'store' | 'localStorage' = 'store'): boolean {
    if (strategy === 'store') {
      return this.userRoles.length > 0;
    }

    return localStorage.getItem('token') !== null;
  }
}
