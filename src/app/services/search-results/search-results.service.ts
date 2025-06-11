import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, combineLatest } from 'rxjs';
import { order, quizSort, sorting } from '../../common/sort';

@Injectable({
  providedIn: 'root',
})
export class SearchResultsService {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly queryParams = this.activatedRoute.queryParamMap;

  private readonly _orderQuery$ = this.queryParams.pipe(
    map(qp => qp.get('order') as order || sorting.order[0]),
  );

  private readonly _sortQuery$ = this.queryParams.pipe(
    map(qp => qp.get('sortBy') as quizSort || sorting.categories[0]),
  );

  private readonly _pageQuery$ = this.queryParams.pipe(
    map(qp => qp.get('page')),
    map(page => Number(page) || 1),
  );

  private readonly _pageSizeQuery$ = this.queryParams.pipe(
    map(qp => qp.get('pageSize')),
    map(pageSize => Number(pageSize) || 5),
  );

  readonly searchOptions$ = combineLatest(
      [
        this._orderQuery$,
        this._sortQuery$,
        this._pageQuery$,
        this._pageSizeQuery$,
      ],
    )
    .pipe(
      map(options => ({
        order: options[0],
        sortBy: options[1],
        page: options[2],
        pageSize: options[3],
      })),
    );
}
