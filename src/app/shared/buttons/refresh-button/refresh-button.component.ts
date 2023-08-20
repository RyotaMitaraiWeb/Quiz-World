import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-refresh-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RefreshButtonComponent {
  @Output() click = new EventEmitter();

  protected emit(event: Event) {
    event.preventDefault();
    
    this.click.emit();
  }
}
