import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private readonly router: Router) {

  }

  title = new FormControl('');

  search(event: Event) {
    event.preventDefault();
    
    this.router.navigate(['/quiz', 'search'], {
      queryParams: {
        search: this.title.value,
      },
      skipLocationChange: false,
    })
  }
}
