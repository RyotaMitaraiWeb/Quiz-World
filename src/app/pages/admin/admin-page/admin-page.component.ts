import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersTabSectionComponent } from '../../../components/admin/tab-sections/users-tab-section/users-tab-section.component';

@Component({
  selector: 'app-admin-page',
  imports: [MatTabsModule, UsersTabSectionComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent { }
