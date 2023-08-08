import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterComponent } from './sorter/sorter.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { LogsComponent } from './logs/logs.component';
import { AdminTabsComponent } from './tabs/admin-tabs.component';

@Component({
  selector: 'app-administration-page',
  standalone: true,
  imports: [
    CommonModule,
    LogsComponent,
    SorterComponent,
    SharedModule,
    MatTabsModule,
    AdminTabsComponent,
  ],
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent {

}
