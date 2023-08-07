import { Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { IUserList } from '../../../../../types/responses/administration.types';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../../../features/admin-service/admin.service';
import { role } from '../../../../../types/auth/roles.types';
import { roles } from '../../../../constants/roles.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-role-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './change-role-button.component.html',
  styleUrls: ['./change-role-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangeRoleButtonComponent implements OnDestroy {
  constructor(private readonly adminService: AdminService) { }
  private addRoleSub = new Subscription();
  private removeRoleSub = new Subscription();

  ngOnDestroy(): void {
    this.addRoleSub.unsubscribe();
    this.removeRoleSub.unsubscribe();
  }

  @Input({ required: true }) role: role = roles.moderator;
  @Input({ required: true }) userId = '';
  @Input({ required: true }) userHasRole = true;
  @Input() color: ThemePalette = 'primary';

  @Output() updateUsersEvent = new EventEmitter<IUserList>();

  changeRole(event: Event): void {
    event.preventDefault();    
    if (!this.userHasRole) {
      this.addRoleSub = this.adminService.addRoleToUser(this.userId, this.role).subscribe({
        next: res => {
          this.updateUsersEvent.emit(res)
        },
        error: err => {
          console.warn(err);
        }
      });
    } else {
      this.removeRoleSub = this.adminService.removeRoleFromUser(this.userId, this.role).subscribe({
        next: res => {
          this.updateUsersEvent.emit(res)
        },
        error: err => {
          console.warn(err);
        }
      });
    }
  }
}
