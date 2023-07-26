import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list.component';
import { Observable, Subscription, of } from 'rxjs';
import { AdminService } from '../../../admin-service/admin.service';
import { IUserResponse } from '../../../../../types/responses/administration.types';
import { order } from '../../../../../types/others/lists.types';

@Component({
  selector: 'app-moderators',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
  ],
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss']
})
export class ModeratorsComponent implements OnInit {
  private modSub = new Subscription();

  constructor(private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.moderators = this.adminService.getModerators();
  }

  moderators: Observable<IUserResponse[]> = of([] as IUserResponse[]);

  updatePage(page: number) {

  }

  updateOrder(order: order) {
    
  }
}
