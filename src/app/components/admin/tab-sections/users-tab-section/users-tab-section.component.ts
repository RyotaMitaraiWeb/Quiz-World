import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../../../../services/admin/admin.service';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { role, roles } from '../../../../common/roles';
import { UserList } from '../../../../services/admin/searchTable.types';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { order } from '../../../../common/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoleChangeSelectComponent } from '../../../common/role-change-select/role-change-select.component';
import { RoleChangeSelectEvent, RoleChangeSelectEventType } from '../../../common/role-change-select/types';

@Component({
  selector: 'app-users-tab-section',
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    RoleChangeSelectComponent,
  ],
  templateUrl: './users-tab-section.component.html',
  styleUrl: './users-tab-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTabSectionComponent implements OnDestroy, OnInit {
  private readonly adminService = inject(AdminService);
  protected displayedColumns = ['username', 'roles', 'actions'];
  protected readonly roles = roles;

  readonly username = new FormControl('');
  readonly form = new FormGroup(
    {
      username: new FormControl(''),
      page: new FormControl(1),
      order: new FormControl('asc' as order),
      role: new FormControl(roles.user as role),
    },
  );

  changeRole(event: RoleChangeSelectEvent, userId: string) {
    switch (event.type) {
      case RoleChangeSelectEventType.Promote:
        this.promote(event.value, userId);
        break;
      default:
        this.demote(event.value, userId);
        break;
    }
  }

  ngOnInit() {
    // valueChanges emits only when a value is changed
    this.form.controls.username.setValue('');
  }

  users = signal<UserList>({
    total: 0,
    users: [],
  });

  ngOnDestroy() {
    this._usersSub.unsubscribe();
    this._promoteSub?.unsubscribe();
    this._demoteSub?.unsubscribe();
  }

  private _usersSub = this.form.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(() => this.adminService.getUsersOfRole(this.form.value.role || roles.user, this.form.value.username || '', {
      order: this.form.value.order || 'asc',
      page: this.form.value.page || 1,
    }))).subscribe({
      next: (v) => {
        this.users.set(v);
      },
      error() {
//
      },
    });


    private promote(role: role, userId: string) {
      this._promoteSub = this.adminService.addRoleToUser(userId, role).subscribe({
        next: v => {
          this.users.set(v);
          this.form.setValue(
            {
              page: 1,
              username: '',
              order: 'asc',
              role: roles.user,
            },
          );
        },
      });
    }

    private demote(role: role, userId: string) {
      this._demoteSub = this.adminService.removeRoleFromUser(userId, role).subscribe({
        next: v => {
          this.users.set(v);
          this.form.setValue(
            {
              page: 1,
              username: '',
              order: 'asc',
              role: roles.user,
            },
          );
        },
      });
    }

    private _promoteSub?: Subscription;
    private _demoteSub?: Subscription;
}
