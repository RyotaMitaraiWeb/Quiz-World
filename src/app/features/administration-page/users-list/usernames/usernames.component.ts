import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of, map, debounce } from 'rxjs';
import { order } from '../../../../../types/others/lists.types';
import { IUserList, IUser } from '../../../../../types/responses/administration.types';
import { roles } from '../../../../constants/roles.constants';
import { AdminService } from '../../../admin-service/admin.service';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../../shared/shared.module';
import { AdminTabsComponent } from '../../tabs/admin-tabs.component';
import { UsersListComponent } from '../users-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usernames',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    AdminTabsComponent,
    UsersListComponent,
  ],
  templateUrl: './usernames.component.html',
  styleUrls: ['./usernames.component.scss']
})
export class UsernamesComponent {
  constructor(
    private readonly adminService: AdminService,
    private readonly route: ActivatedRoute,
  ) {

  }

  order: order = 'asc';
  page = 1;
  username = '';


  userList$ = of<IUserList>({ total: 0, users: [] });

  protected options: Record<string, order> = {
    'Username (Ascending)': 'asc',
    'Username (Descending)': 'desc',
  }

  protected defaultUsers: IUser[] = [];

  changePage(page: number) {
    this.page = page;
    this.updateUsers();
  }

  protected updateUsers() {
    if (this.username) {
      this.userList$ = this.adminService
      .getUsersByUsername(this.username, this.page, this.order)
      .pipe(
        map(this.mapToList)
      );
    }
  }

  changeOrder(order: string) {
    this.order = order as order;
    this.updateUsers();
  }

  changeUsername(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    this.username = data.get('username')?.toString() || '';
    this.updateUsers();
  }

  private mapToList(list: IUserList) {
    return {
      total: list.total,
      users: list.users.map((u, i) => ({ ...u, index: i + 1, roleButtons: u.roles }))
    };
  }
}
