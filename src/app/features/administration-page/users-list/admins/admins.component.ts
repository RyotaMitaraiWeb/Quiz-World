import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../admin-service/admin.service';
import { IUser } from '../../../../../types/responses/administration.types';
import { order } from '../../../../../types/others/lists.types';
import { UsersListComponent } from '../users-list.component';
import { SharedModule } from '../../../../shared/shared.module';
import { SorterComponent } from '../../sorter/sorter.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
    SharedModule,
    SorterComponent,
  ],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  private adminSub = new Subscription();

  constructor(private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.adminSub = this.adminService.getAdmins()
    .subscribe({
      next: (userList) => {
        this.total = userList.total;
        this.admins = userList.users.map((u, i) => ({ index: i + 1, roleButtons: u.roles, ...u}) as IUser)
      },
      error: (err) => {
        console.warn(err);
        
      }
    })
  }

  admins: IUser[] = [];
  total = 0;

  order: order = 'asc';
  page = 0;

  updatePage(page: number) {
    this.page = page;
    this.adminSub = this.adminService.getAdmins().subscribe({
      next: (userList) => {
        this.total = userList.total;
        this.admins = userList.users.map((u, i) => ({ index: i + 1, roleButtons: u.roles, ...u}) as IUser)
      },
      error: (err) => {
        console.warn(err);
        
      }
    });
  }

  updateOrder(order: order) {
    this.order = order;
    this.adminSub = this.adminService.getAdmins().subscribe({
      next: (userList) => {
        this.total = userList.total;
        this.admins = userList.users.map((u, i) => ({ index: i + 1, roleButtons: u.roles, ...u}) as IUser)
      },
      error: (err) => {
        console.warn(err);
        
      }
    });
  }
}
