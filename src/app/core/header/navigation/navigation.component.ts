import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { selectUserRoles } from '../../../store/user/user.selector';
import { RouterModule } from '@angular/router';
import { role } from '../../../../types/auth/roles.types';
import { MatIconModule } from '@angular/material/icon';
import { LogoutButtonModule } from './logout-button/logout-button.module';
import { RoleService } from '../../role-service/role.service';
import { MenuButtonComponent } from './menu-button/menu-button.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    LogoutButtonModule,
    MenuButtonComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(
    private readonly store: Store<IAppStore>,
    private readonly roleService: RoleService,
    ) { }

  /**
   * Returns ``true`` if the ``userRoles`` property is an empty array,
   * otherwise returns ``false``
   */
  protected get isGuest() {
    return this.roleService.isGuest();
  }


}
