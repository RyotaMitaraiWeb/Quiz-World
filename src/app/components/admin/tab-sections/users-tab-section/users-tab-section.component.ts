import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../../../../services/admin/admin.service';
import { Subscription } from 'rxjs';
import { roles } from '../../../../common/roles';
import { UserList } from '../../../../services/admin/searchTable.types';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-users-tab-section',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './users-tab-section.component.html',
  styleUrl: './users-tab-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTabSectionComponent implements OnInit, OnDestroy {
  private readonly adminService = inject(AdminService);
  protected displayedColumns = ['username', 'roles', 'actions'];

  ngOnInit() {
    this._usersSub = this.adminService.getUsersOfRole(roles.user, '', {
      order: 'asc',
      page: 1,
    }).subscribe({
      next: (v) => {
        this.users.set(v);
      },
      error() {
//
      },
    });
  }

  users = signal<UserList>({
    total: 0,
    users: [],
  });

  ngOnDestroy() {
    this._usersSub?.unsubscribe();
  }

  private _usersSub?: Subscription;
}
