import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../../admin-service/admin.service';
import { MatTableModule } from '@angular/material/table';
import { IUserResponse } from '../../../../types/responses/administration.types';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input({ required: true }) data: IUserResponse[] | Observable<IUserResponse[]> = [];

  protected displayedColumns = ['index', 'username', 'roles', 'roleButtons'];
}
