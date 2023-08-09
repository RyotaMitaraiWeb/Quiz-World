import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
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

  redirect() {
    this.router.navigate(['/administration', 'usernames']);
  }

  isAdmin = this.roleService.isAdmin();

  username = this.route.data
    .pipe(
      tap(data => console.log(data)
      ),
      map(data => (data['profile'] as IUserState).username)
    );

    userId = this.route.data
    .pipe(
      map(data => (data['profile'] as IUserState).id)
    );

    roles = this.route.data
    .pipe(
      map(data => (data['profile'] as IUserState).roles)
    );

    get isModerator() {
      return this.roles.pipe(
        map(r => r.includes(roles.moderator))
      );
    }
}
