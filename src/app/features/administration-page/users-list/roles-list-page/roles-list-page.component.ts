import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { AdminTabsComponent } from '../../tabs/admin-tabs.component';
import { UsersListComponent } from '../users-list.component';
import { ActivatedRoute } from '@angular/router';
import { of, map, tap } from 'rxjs';
import { order } from '../../../../../types/others/lists.types';
import { IUserList, IUser } from '../../../../../types/responses/administration.types';
import { roles } from '../../../../constants/roles.constants';
import { AdminService } from '../../../admin-service/admin.service';
import { role } from '../../../../../types/auth/roles.types';

@Component({
  selector: 'app-roles-list-page',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
    SharedModule,
    AdminTabsComponent,
  ],
  templateUrl: './roles-list-page.component.html',
  styleUrls: ['./roles-list-page.component.scss']
})
export class RolesListPageComponent {
  constructor(
    private readonly adminService: AdminService,
    private readonly route: ActivatedRoute,
    ) {

  }

  order: order = 'asc';
  page = 1;

  getResolvedData() {
    return this.route.data;
  }

  get pageRole() {
    return this.getResolvedData()
      .pipe(
        map(data => data['pageRole'] as role)
      );
  }
  userList$ = of<IUserList>({ total: 0, users: []});

  protected options: Record<string, order> = {
    'Username (Ascending)': 'asc',
    'Username (Descending)': 'desc',
  }

  protected defaultUsers: IUser[] = [];

  ngOnInit(): void {
    // this.userList$ = this.adminService
    //   .getUsersOfRole(roles.user)
    //   .pipe(
    //     map(this.mapToList),
    //   );

    this.pageRole.pipe(
      tap(role => {
        this.userList$ = this.adminService
          .getUsersOfRole(role)
          .pipe(
            map(this.mapToList)
          )
      })
    )
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
