import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, combineLatest } from 'rxjs';
import { order, quizSort } from '../../common/sort';

@Injectable({
  providedIn: 'root',
})
export class SearchResultsService {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly queryParams = this.activatedRoute.queryParamMap;

  private readonly _orderQuery$ = this.queryParams.pipe(
    map(qp => qp.get('order') as order),
  );

  private readonly _sortQuery$ = this.queryParams.pipe(
    map(qp => qp.get('sort') as quizSort),
  );

  readonly searchOptions$ = combineLatest(
      [this._orderQuery$, this._sortQuery$],
    )
    .pipe(
      map(options => ({ sort: options[1], order: options[0] })),
    );
}
