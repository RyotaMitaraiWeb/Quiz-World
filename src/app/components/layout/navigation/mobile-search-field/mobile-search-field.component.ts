import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchFieldDirective } from '../../../../directives/search-field/search-field.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-search-field',
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SearchFieldDirective,
  ],
  templateUrl: './mobile-search-field.component.html',
  styleUrl: './mobile-search-field.component.scss',
})
export class MobileSearchFieldComponent {
  protected readonly form = new FormGroup({
    query: new FormControl(''),
  });

  private readonly _routerEventsSub?: Subscription;
}
