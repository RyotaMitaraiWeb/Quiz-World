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
}
