import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list.component';
import { AdminService } from '../../../admin-service/admin.service';
import { Observable, map, of, tap } from 'rxjs';
import { IUser, IUserList, IUserResponse } from '../../../../../types/responses/administration.types';
import { roles } from '../../../../constants/roles.constants';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { order } from '../../../../../types/others/lists.types';
import { AdminTabsComponent } from '../../tabs/admin-tabs.component';
import { role } from '../../../../../types/auth/roles.types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
    SharedModule,
    AdminTabsComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private readonly adminService: AdminService,
    private readonly route: ActivatedRoute,
    ) {

  }

  order: order = 'asc';
  page = 1;


  userList$ = of<IUserList>({ total: 0, users: []});

  protected options: Record<string, order> = {
    'Username (Ascending)': 'asc',
    'Username (Descending)': 'desc',
  }

  protected defaultUsers: IUser[] = [];

  ngOnInit(): void {
    this.userList$ = this.adminService
      .getUsersOfRole(roles.user)
      .pipe(
        map(this.mapToList),
      );
  }

  protected updateUsers() {
    this.userList$ = this.adminService
      .getUsersOfRole(roles.user, this.page, this.order)
      .pipe(
        map(this.mapToList),
      );
  }

  changePage(page: number) {
    this.page = page;
    this.updateUsers();
  }

  changeOrder(order: string) {
    this.order = order as order;
    this.updateUsers();
  }

  private mapToList(list: IUserList) {
    return {
      total: list.total,
      users: list.users.map((u, i) => ({ ...u, index: i + 1, roleButtons: u.roles }))
    };
  }
}
