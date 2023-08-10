import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../core/role-service/role.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { selectUser } from '../../store/user/user.selector';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private readonly roleService: RoleService,
    private readonly store: Store<IAppStore>,
  ) { }

  user = this.store.select(selectUser);

  protected isLoggedIn() {
    return this.roleService.isLoggedIn();
  }
}
