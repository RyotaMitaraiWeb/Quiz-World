import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list.component';
import { Observable, Subscription, map, of } from 'rxjs';
import { AdminService } from '../../../admin-service/admin.service';
import { IUser, IUserResponse } from '../../../../../types/responses/administration.types';
import { order } from '../../../../../types/others/lists.types';

@Component({
  selector: 'app-moderators',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
  ],
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss']
})
export class ModeratorsComponent implements OnInit {
  private modSub = new Subscription();

  constructor(private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.modSub = this.adminService.getModerators()
    .subscribe({
      next: (userList) => {
        this.total = userList.total;
        this.moderators = userList.users.map((u, i) => ({ index: i + 1, roleButtons: u.roles, ...u}) as IUser)
      },
      error: (err) => {
        console.warn(err);
        
      }
    })
  }

  moderators: IUser[] = [];
  total = 0;

  updatePage(page: number) {

  }

  updateOrder(order: order) {
    
  }
}
