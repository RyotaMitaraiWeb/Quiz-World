import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IUserState } from '../../../types/store/user.types';
import { SharedModule } from '../../shared/shared.module';
import { RoleService } from '../../core/role-service/role.service';
import { roles } from '../../constants/roles.constants';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    SharedModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly roleService: RoleService,
    private readonly router: Router,
  ) {

  }

  protected redirect() {
    this.router.navigate(['/administration', 'usernames']);
  }

  /**
   * Returns the resolved ``data`` from the route. Used for easier spying
   * in tests.
   */
  getResolvedData(): Observable<Data> {
    return this.route.data;
  }

  protected get isAdmin() {
    return this.roleService.isAdmin();
  }

  protected get username() {
    return this.getResolvedData()
    .pipe(
      map(data => (data['profile'] as IUserState).username)
    );
  }

  protected get userId() {
    return this.getResolvedData()
      .pipe(
        map(data => (data['profile'] as IUserState).id)
      );
  }

  protected get roles() {
    return this.getResolvedData()
      .pipe(
        map(data => (data['profile'] as IUserState).roles)
      );
  }

  protected get isModerator() {
    return this.roles.pipe(
      map(r => r.includes(roles.moderator))
    );
  }
}
