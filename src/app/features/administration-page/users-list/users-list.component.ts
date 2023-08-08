import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../../admin-service/admin.service';
import { MatTableModule } from '@angular/material/table';
import { IUser, IUserResponse } from '../../../../types/responses/administration.types';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input({ required: true }) data: IUser[] | Observable<IUser[]> = [];

  protected displayedColumns = ['index', 'username', 'roles', 'roleButtons'];
}
