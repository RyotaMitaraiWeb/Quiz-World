import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchFieldDirective } from '../../../../directives/search-field/search-field.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-desktop-search-field',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SearchFieldDirective,
  ],
  templateUrl: './desktop-search-field.component.html',
  styleUrl: './desktop-search-field.component.scss',
})
export class DesktopSearchFieldComponent {
  open = input(false);

  protected readonly form = new FormGroup(
    {
      query: new FormControl(''),
    },
  );
}
