import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../../../../services/admin/admin.service';
import { debounceTime, distinctUntilChanged, startWith, Subscription, switchMap, tap } from 'rxjs';
import { role, roles } from '../../../../common/roles';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { order, sorting } from '../../../../common/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoleChangeSelectComponent } from '../../../common/role-change-select/role-change-select.component';
import { RoleChangeSelectEvent, RoleChangeSelectEventType } from '../../../common/role-change-select/types';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../../../services/profile/profile.service';
import { defaultSearchValues } from '../../../../common/search';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarMessages } from '../../../../common/snackbar';

@Component({
  selector: 'app-users-tab-section',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterModule,
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
  private readonly profileService = inject(ProfileService);
  private readonly snackbar = inject(MatSnackBar);

  protected displayedColumns = ['id', 'username', 'roles', 'actions'];
  protected readonly roles = roles;

  readonly form = new FormGroup(
    {
      username: new FormControl(''),
      page: new FormControl(1),
      order: new FormControl('Ascending' as order),
      roles: new FormControl([roles.user] as role[]),
      pageSize: new FormControl(20),
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


  changePage(pageEvent: PageEvent) {
    const page = pageEvent.pageIndex + 1;
    const pageSize = pageEvent.pageSize;
    this.form.patchValue({ page, pageSize });
  }

  ngOnDestroy() {
    this._promoteSub?.unsubscribe();
    this._demoteSub?.unsubscribe();
  }

  protected readonly users$ = this.form.valueChanges.pipe(
    startWith(this.form.value),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(() => this.profileService.searchProfiles({
      page: this.form.value.page || 1,
      pageSize: this.form.value.pageSize || 20,
      order: this.form.value.order || 'Ascending',
      roles: this.form.value.roles || [roles.user],
      username: this.form.value.username || '',
    })),
  );


    private promote(role: role, userId: string) {
      this._promoteSub = this.adminService.addRoleToUser(userId, role)
      .pipe(
        // trigger a "refresh"
        tap(() => this.form.patchValue({ username: this.form.value.username })),
      ).subscribe({
        next: () => {
          this.snackbar.open(snackbarMessages.success.admin.role.promoted(role));
        },
        error() {
          //
        },
      });
    }

    private demote(role: role, userId: string) {
      this._demoteSub = this.adminService.removeRoleFromUser(userId, role)
      .pipe(
        // trigger a "refresh"
        tap(() => this.form.patchValue({ username: this.form.value.username })),
      ).subscribe({
        next: () => {
          this.snackbar.open(snackbarMessages.success.admin.role.demoted(role));
        },
        error() {
          //
        },
      });
    }

    private _promoteSub?: Subscription;
    private _demoteSub?: Subscription;

    protected readonly orders = sorting.order;
    protected readonly defaultSearchParameters = defaultSearchValues;
}
