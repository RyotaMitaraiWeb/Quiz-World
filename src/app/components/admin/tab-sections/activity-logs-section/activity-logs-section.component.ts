import { ChangeDetectionStrategy, Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { order, sorting } from '../../../../common/sort';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { IndexedLogsList } from '../../../../services/admin/logs.types';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-activity-logs-section',
  imports: [
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
export class ActivityLogsSectionComponent implements OnInit, OnDestroy {
  private readonly adminService = inject(AdminService);
  protected readonly displayedColumns = ['index', 'message', 'date'];

  ngOnInit() {
    this.form.controls.page.setValue(1);
  }

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

  logs = signal<IndexedLogsList>({
    total: 0,
    logs: [
      {
        index: 0,
        date: '',
        message: '',
      },
    ],
  });

  protected readonly form = new FormGroup(
    {
      page: new FormControl(1),
      order: new FormControl<order>(sorting.order[0]),
      pageSize: new FormControl(20),
    },
  );

  private _logsSub = this.form.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(() => this.adminService.getActivityLogs(
      {
        page: this.form.value.page || 1,
        order: this.form.value.order || sorting.order[0],
      },
    )),
  ).subscribe({
    next: (logs) => {
      this.logs.set(logs);
    },
    error: () => {
      //
    },
  });

  ngOnDestroy() {
    this._logsSub.unsubscribe();
  }
}
