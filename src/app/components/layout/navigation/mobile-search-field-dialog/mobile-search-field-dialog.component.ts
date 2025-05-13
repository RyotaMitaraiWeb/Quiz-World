import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MobileSearchFieldComponent } from '../mobile-search-field/mobile-search-field.component';

@Component({
  selector: 'app-mobile-search-field-dialog',
  imports: [
    MatDialogModule,
    MobileSearchFieldComponent,
  ],
  templateUrl: './mobile-search-field-dialog.component.html',
  styleUrl: './mobile-search-field-dialog.component.scss',
})
export class MobileSearchFieldDialogComponent {

}
