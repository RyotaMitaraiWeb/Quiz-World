import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SheetComponent {
  @Input() centerContent = false;
}
