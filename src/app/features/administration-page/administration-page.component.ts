import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterComponent } from './sorter/sorter.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { LogsModule } from './logs/logs.module';
import { LogsComponent } from './logs/logs.component';
import { ModeratorsComponent } from './users-list/moderators/moderators.component';
import { UsersComponent } from './users-list/users/users.component';
import { AdminsComponent } from './users-list/admins/admins.component';

@Component({
  selector: 'app-administration-page',
  standalone: true,
  imports: [
    CommonModule,
    LogsComponent,
    SorterComponent,
    ModeratorsComponent,
    UsersComponent,
    AdminsComponent,
    SharedModule,
    MatTabsModule,
  ],
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent {

}
