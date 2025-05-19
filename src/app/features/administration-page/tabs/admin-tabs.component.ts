import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

interface ITab {
  label: string;
  activeRoute: string,
  route: string,
}

@Component({
  selector: 'app-admin-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule,
  ],
  templateUrl: './admin-tabs.component.html',
  styleUrls: ['./admin-tabs.component.scss']
})
export class AdminTabsComponent {
  @Input() activeRoute = 'users';

  protected routes: ITab[] = [
    {
      label: 'View all users',
      activeRoute: 'users',
      route: '/administration/users',
    },
    {
      label: 'View all moderators',
      activeRoute: 'moderators',
      route: '/administration/moderators',
    },
    {
      label: 'View all administrators',
      activeRoute: 'admins',
      route: '/administration/admins'
    },
    {
      label: 'View users by username',
      activeRoute: 'usernames',
      route: '/administration/usernames',
    },
    {
      label: 'Activity logs',
      activeRoute: 'logs',
      route: '/administration/logs',
    },
  ]
}
