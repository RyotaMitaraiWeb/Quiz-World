import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { activityLogsOrderLabels, order, sorting } from '../../../../common/sort';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { IndexedLogsList } from '../../../../services/admin/logs.types';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { defaultSearchValues } from '../../../../common/search';

@Component({
  selector: 'app-activity-logs-section',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
  ],
  templateUrl: './activity-logs-section.component.html',
  styleUrl: './activity-logs-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityLogsSectionComponent {
  private readonly adminService = inject(AdminService);
  protected readonly displayedColumns = ['index', 'message', 'date'];

  changePage(pageEvent: PageEvent) {
    const page = pageEvent.pageIndex + 1;
    const pageSize = pageEvent.pageSize;
    this.form.patchValue(
      {
        page,
        pageSize,
      },
    );
  }

  protected defaultLogs: IndexedLogsList = {
    total: 0,
    logs: [],
  };

  protected readonly form = new FormGroup(
    {
      page: new FormControl(1),
      order: new FormControl<order>(sorting.order[0]),
      pageSize: new FormControl(20),
    },
  );

  protected readonly logs$ = this.form.valueChanges.pipe(
    startWith(this.form.value),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(() => this.adminService.getActivityLogs(
      {
        page: this.form.value.page || 1,
        order: this.form.value.order || sorting.order[0],
      },
    )),
  );


  protected readonly orders = sorting.order;
  protected readonly orderLabels = activityLogsOrderLabels;

  protected readonly defaultSearchParameters = defaultSearchValues;
}
