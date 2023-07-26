import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../../../types/responses/administration.types';
import { order } from '../../../../../types/others/lists.types';
import { AdminService } from '../../../admin-service/admin.service';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersListComponent } from '../users-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  private usersSub = new Subscription();

  constructor(private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.usersSub = this.adminService.getUsers()
    .subscribe({
      next: (userList) => {
        this.total = userList.total;
        this.users = userList.users.map((u, i) => ({ index: i + 1, roleButtons: u.roles, ...u}) as IUser)
      },
      error: (err) => {
        console.warn(err);
        
      }
    })
  }

  users: IUser[] = [];
  total = 0;

  updatePage(page: number) {

  }

  updateOrder(order: order) {
    
  }
}
