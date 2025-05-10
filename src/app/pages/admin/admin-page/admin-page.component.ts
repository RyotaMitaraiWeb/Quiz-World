import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersTabSectionComponent } from '../../../components/admin/tab-sections/users-tab-section/users-tab-section.component';
import { ActivityLogsSectionComponent } from '../../../components/admin/tab-sections/activity-logs-section/activity-logs-section.component';

@Component({
  selector: 'app-admin-page',
  imports: [MatTabsModule, UsersTabSectionComponent, ActivityLogsSectionComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent { }
