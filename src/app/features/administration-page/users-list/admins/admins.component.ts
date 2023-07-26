import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../admin-service/admin.service';
import { IUser } from '../../../../../types/responses/administration.types';
import { order } from '../../../../../types/others/lists.types';
import { UsersListComponent } from '../users-list.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  private modSub = new Subscription();

  constructor(private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.modSub = this.adminService.getAdmins()
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

  updatePage(page: number) {

  }

  updateOrder(order: order) {
    
  }
}
