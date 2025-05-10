import { ChangeDetectionStrategy, Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { order, sorting } from '../../../../common/sort';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { IndexedLogsList } from '../../../../services/admin/logs.types';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-activity-logs-section',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './activity-logs-section.component.html',
  styleUrl: './activity-logs-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityLogsSectionComponent implements OnInit, OnDestroy {
  private readonly adminService = inject(AdminService);

  ngOnInit() {
    this.form.controls.page.setValue(1);
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
    },
  );

  private _logsSub = this.form.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(() => of(this.form.value)),
    switchMap((value) => this.adminService.getActivityLogs(
      {
        page: value.page || 1,
        order: value.order || sorting.order[0],
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
