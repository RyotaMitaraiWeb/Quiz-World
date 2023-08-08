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

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AdminTabsComponent,
    UsersListComponent,
  ],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  constructor(
    private readonly adminService: AdminService,
    private readonly route: ActivatedRoute,
    ) {

  }

  order: order = 'asc';
  page = 1;


  userList$ = of<IUserList>({ total: 0, users: []});

  // protected total$ = this.userList$.pipe(map(ul => ul.total));

  protected options: Record<string, order> = {
    'Username (Ascending)': 'asc',
    'Username (Descending)': 'desc',
  }

  protected defaultUsers: IUser[] = [];

  ngOnInit(): void {
    this.userList$ = this.adminService
      .getUsersOfRole(roles.admin)
      .pipe(
        map(this.mapToList),
      );
  }

  protected updateUsers() {
    this.userList$ = this.adminService
      .getUsersOfRole(roles.admin, this.page, this.order)
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
