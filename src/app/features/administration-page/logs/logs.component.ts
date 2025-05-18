import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service/admin.service';
import { order } from '../../../../types/others/lists.types';
import { SharedModule } from '../../../shared/shared.module';
import { SorterComponent } from '../sorter/sorter.component';
import { MatTableModule } from '@angular/material/table';
import { IIndexedLogActivity } from '../../../../types/administration/logs.types';
import { Subscription } from 'rxjs';
import { AdminTabsComponent } from '../tabs/admin-tabs.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SorterComponent,
    MatTableModule,
    AdminTabsComponent
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
            index: this.calculateIndex(i),
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

  page = 1;
  order: order = 'asc';

  total = 0;

  protected options: Record<string, order> = {
    'Date (Ascending)': 'asc',
    'Date (Descending)': 'desc',
  };

  updatePage(page: number) {
    this.page = page;
    this.logsSub = this.adminService.getActivityLogs(this.page, this.order).subscribe({
      next: res => {
        this.total = res.total;
        this.logs = res.logs.map((l, i) => (
          {
            index: this.calculateIndex(i),
            ...l
          }
        ));
        
      }
    });
  }

  updateOrder(order: string) {    
    this.order = order as order;
    this.logsSub = this.adminService.getActivityLogs(this.page, this.order).subscribe({
      next: res => {
        this.total = res.total;
        this.logs = res.logs.map((l, i) => (
          {
            index: this.calculateIndex(i),
            ...l
          }
        ));
      }
    });
  }

  protected readonly displayedColumns = ['index', 'message', 'date'];

  ngOnDestroy() {
    this.logsSub.unsubscribe();
  }

  private calculateIndex(index: number) {
    return (index + 1) + ((this.page - 1) * 20);
  }
}
