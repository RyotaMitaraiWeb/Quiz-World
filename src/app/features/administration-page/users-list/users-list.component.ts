import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../../admin-service/admin.service';
import { MatTableModule } from '@angular/material/table';
import { IUser, IUserList, IUserResponse } from '../../../../types/responses/administration.types';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    RouterModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input({ required: true }) data: IUser[] | Observable<IUser[]> = [];
  @Output() updateUsersEvent = new EventEmitter<IUserList>();

  protected displayedColumns = ['index', 'username', 'roles', 'roleButtons'];
}
