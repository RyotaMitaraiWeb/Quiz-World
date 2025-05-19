import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../../admin-service/admin.service';
import { MatTableModule } from '@angular/material/table';
import { IUser, IUserList, IUserResponse } from '../../../../types/responses/administration.types';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    RouterModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input({ required: true }) data: IUser[] | Observable<IUser[]> = [];
  @Output() updateUsersEvent = new EventEmitter<IUserList>();
  @Output() refresh = new EventEmitter();

  protected emit() {
    this.refresh.emit();
  }

  protected displayedColumns = ['index', 'username', 'roles', 'roleButtons'];
}
