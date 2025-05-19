import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api } from '../../common/api';
import { SearchOptionsWithPaginationAndOrdering } from '../../types/search';
import { paramsBuilder } from '../../util/paramsBuilder';
import { UserList } from './searchTable.types';
import { IndexedLogsList, LogsList } from './logs.types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly http = inject(HttpClient);

  readonly rolesUrl = api.endpoints.roles;
  readonly logsUrl = api.endpoints.logs;

  getUsersOfRole(role: string, username: string, options: SearchOptionsWithPaginationAndOrdering) {
    const params = paramsBuilder({ ...options, username });

    return this.http.get<UserList>(this.rolesUrl.getUsersOfRole(role), { params });
  }

  getUsersByUsername(username: string, options?: SearchOptionsWithPaginationAndOrdering) {
    const params = paramsBuilder({ ...options, username });

    return this.http.get<UserList>(this.rolesUrl.getUsersOfUsername(), { params });
  }

  addRoleToUser(id: string, role: string) {
    return this.http.put<UserList>(this.rolesUrl.promote(id, role), {});
  }

  removeRoleFromUser(id: string, role: string) {
    return this.http.put<UserList>(this.rolesUrl.demote(id, role), {});
  }

  getActivityLogs(options?: SearchOptionsWithPaginationAndOrdering) {
    const params = paramsBuilder(options);
    const page = options?.page;

    return this.http.get<LogsList>(this.logsUrl.getLogs, { params })
      .pipe<IndexedLogsList>(
        map((logsList) => {
          return {
            total: logsList.total,
            logs: logsList.logs.map((log, index) => ({ ...log, index: this._calculateLogIndex(index, page) })),
          };
        }),
      );
  }

  private _calculateLogIndex(index: number, page = 1) {
    return (index + 1) + ((page - 1) * 20);
  }
}
