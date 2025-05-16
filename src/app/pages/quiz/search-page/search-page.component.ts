import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-search-page',
  imports: [AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly queryParams = this.activatedRoute.queryParamMap;

  protected readonly searchQuery = this.queryParams.pipe(
    map(qp => qp.get('query')),
  );

}
