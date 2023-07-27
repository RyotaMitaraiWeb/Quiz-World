import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service/admin.service';
import { order } from '../../../../types/others/lists.types';
import { SharedModule } from '../../../shared/shared.module';
import { SorterComponent } from '../sorter/sorter.component';
import { MatTableModule } from '@angular/material/table';
import { IIndexedLogActivity } from '../../../../types/administration/logs.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SorterComponent,
    MatTableModule,
  ],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  constructor(
    private readonly adminService: AdminService
  ) { }

  private logsSub = new Subscription();

  ngOnInit() {
    this.logsSub = this.adminService.getActivityLogs().subscribe({
      next: res => {
        this.total = res.total;
        this.logs = res.logs.map((l, i) => (
          {
            index: i,
            ...l
          }
        ));
      }
    });
  }

  logs: IIndexedLogActivity[] = [
    {
      index: 0,
      date: Date.now().toString(),
      message: '',
    }
  ]

  page = 0;
  order: order = 'asc';

  total = 0;

  updatePage(page: number) {
    this.page = page;
    this.logsSub = this.adminService.getActivityLogs().subscribe({
      next: res => {
        this.total = res.total;
        this.logs = res.logs.map((l, i) => (
          {
            index: i,
            ...l
          }
        ));
      }
    });
  }

  updateOrder(order: order) {
    this.order = order;
    this.logsSub = this.adminService.getActivityLogs().subscribe({
      next: res => {
        this.total = res.total;
        this.logs = res.logs.map((l, i) => (
          {
            index: i,
            ...l
          }
        ));
      }
    });
  }

  protected readonly displayedColumns = ['index', 'message', 'date'];
}
