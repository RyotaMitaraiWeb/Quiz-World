import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service/admin.service';
import { order } from '../../../../types/others/lists.types';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  constructor(
    private readonly adminService: AdminService
  ) { }

  ngOnInit() {
    
  }

  page = 0;
  order: order = 'asc';

  updateLogs() {

  }
}
