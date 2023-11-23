import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DisableOnLoadingDirective } from '../../directives/disable-on-loading/disable-on-loading.directive';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    DisableOnLoadingDirective,
  ],
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditButtonComponent {
  @Input({ required: true }) id = 0;
}
