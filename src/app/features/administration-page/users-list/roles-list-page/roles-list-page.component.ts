import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { AdminTabsComponent } from '../../tabs/admin-tabs.component';
import { UsersListComponent } from '../users-list.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, map, tap, switchMap, BehaviorSubject, Subscription, takeUntil, flatMap, share, shareReplay, distinctUntilChanged, take, debounce, debounceTime, filter, Observable } from 'rxjs';
import { order } from '../../../../../types/others/lists.types';
import { IUserList, IUser } from '../../../../../types/responses/administration.types';
import { roles } from '../../../../constants/roles.constants';
import { AdminService } from '../../../admin-service/admin.service';
import { role } from '../../../../../types/auth/roles.types';

@Component({
  selector: 'app-roles-list-page',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
    SharedModule,
    AdminTabsComponent,
  ],
  templateUrl: './roles-list-page.component.html',
  styleUrls: ['./roles-list-page.component.scss'],
})
export class RolesListPageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly adminService: AdminService,
    private readonly route: ActivatedRoute,
  ) {

  }

  /**
   * Maps the route parameter to the respective role
   */
  readonly formattedRoles: Record<string, role> = {
    'users': roles.user,
    'moderators': roles.moderator,
    'admins': roles.admin,
  }

  order: order = 'asc';
  page = 1;

  /**
   * Returns the route params map. Used for easier spying in tests.
   */
  getRouteParams(): Observable<ParamMap> {
    return this.route.paramMap;
  }

  /**
   * Returns the requested role for the given page.
   * The role is taken from the route parameter ``role``
   * and mapped to the respective value by referencing
   * the ``formattedRoles`` property.
   */
  get pageRole(): Observable<role> {
    return this.getRouteParams()
      .pipe(
        map(params => {
          const role = params.get('role') || 'user';
          const formattedRole = this.formattedRoles[role];
          return formattedRole;
        })
      )
  }

  /**
   * Returns the route parameter ``role`` for the current page,
   * which will be passed to the tabs menu to track the current tab.
   */
  protected get activeRole() {
    return this.getRouteParams()
      .pipe(
        map(params => params.get('role'))
      );
  }

  private userList$$ = new BehaviorSubject<IUserList>({ total: 0, users: [] });
  get userList$() {
    return this.userList$$.asObservable();
  }

  protected options: Record<string, order> = {
    'Username (Ascending)': 'asc',
    'Username (Descending)': 'desc',
  }

  protected defaultUsers: IUser[] = [];

  ngOnInit(): void {
    this.updateUsers(1, 'asc');
  }

  // Prevent service from sending two requests.
  private isLoading = false;

  /**
   * Updates the ``userList$`` observable with data from the server.
   * @param page 
   * @param order 
   */
  updateUsers(page: number, order: order): void {
    console.log('a');

    this.sub = this.pageRole
      .pipe(
        filter(() => !this.isLoading),
        tap(() => this.isLoading = true),
        switchMap(role => this.adminService.getUsersOfRole(role, page, order)),
        tap(a => console.log(a)),
        map(list => this.mapToList(list)),
      ).subscribe({
        next: list => {
          this.userList$$.next(list);
          this.isLoading = false;
        },
        error: () => { }
      });
  }

  /**
   * Updates the ``userList$`` observable with data from the server from the given page.
   * @param page 
   */
  changePage(page: number) {
    this.page = page;
    this.updateUsers(this.page, this.order);
  }

  /**
   * Updates the ``userList$`` observable with data from the server in the given order.
   * @param order 
   */
  changeOrder(order: string) {
    this.order = order as order;
    this.updateUsers(this.page, this.order);
  }

  /**
   * Maps the provided ``list`` to an object that can be 
   * used by the ``app-users-list`` table to render the users
   * properly.
   * @param list 
   * @returns 
   */
  private mapToList(list: IUserList) {
    console.log(list);

    return {
      total: list.total,
      users: list.users.map((u, i) => ({ ...u, index: this.calculateIndex(i), roleButtons: u.roles }))
    };
  }

  /**
   * Calculates the index of a row by taking into account the current page.
   * @param index 
   * @returns 
   */
  private calculateIndex(index: number) {
    return (index + 1) + ((this.page - 1) * 20);
  }

  private sub = new Subscription();

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.userList$$.complete();
  }
}
