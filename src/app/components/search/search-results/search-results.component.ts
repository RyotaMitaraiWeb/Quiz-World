import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, combineLatest } from 'rxjs';
import { SortAndOrder, order, quizSort } from '../../../common/sort';
import { SearchQuizSorterComponent } from '../search-quiz-sorter/search-quiz-sorter.component';
import { AsyncPipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-search-results',
  imports: [AsyncPipe, MatPaginatorModule, SearchQuizSorterComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  routeToNavigate = input.required<string[]>();

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly queryParams = this.activatedRoute.queryParamMap;

  search(options: SortAndOrder) {
    this.router.navigate(this.routeToNavigate(), {
      queryParams: options,
      queryParamsHandling: 'merge',
    });
  }

  private readonly _orderQuery$ = this.queryParams.pipe(
    map(qp => qp.get('order') as order),
  );

  private readonly _sortQuery$ = this.queryParams.pipe(
    map(qp => qp.get('sort') as quizSort),
  );

  protected readonly searchOptions$ = combineLatest(
      [this._orderQuery$, this._sortQuery$],
    )
    .pipe(
      map(options => ({ sort: options[1], order: options[0] })),
    );
}
