import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IQuizList, order, sort } from '../../../types/others/lists.types';
import { HttpParams } from '@angular/common/http';
import { CataloguePaginatorModule } from '../catalogue-paginator/catalogue-paginator.module';
import { CatalogueSelectMenuComponent } from '../catalogue-select-menu/catalogue-select-menu.component';
import { QuizListItemComponent } from '../quiz-list-item/quiz-list-item.component';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    CataloguePaginatorModule,
    CatalogueSelectMenuComponent,
    QuizListItemComponent,
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  // providers: [{
  //   provide: RouteReuseStrategy,
  // }],
})
export class CatalogueComponent implements OnInit, OnDestroy {
  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private routeSub = new Subscription();

  @Output() updateQuizzesEvent = new EventEmitter<
    {
      page: number,
      sort: sort,
      order: order,
    }
  >;

  /**
   * On initial load, the quizzes are supplied via a resolver, so
   * no need to emit an update on load.
   */
  private initial = true;

  ngOnInit(): void {
    this.getQueryParams().subscribe(params => {
      this.page = Number(params['page']) || 1;
      this.sort = params['sort'] || 'title';
      this.order = params['order'] || 'asc';

      if (!this.initial) {
        this.updateQuizzesEvent.emit(
          {
            page: this.page,
            sort: this.sort,
            order: this.order,
          }
        )
      } else {
        this.initial = false;
      }
    })
  }

  getQueryParams() {
    return this.route.queryParams;
  }

  @Input({ required: true }) catalogue: IQuizList = {
    total: 0,
    quizzes: [],
  };

  page = 0;
  sort: sort = 'title';
  order: order = 'asc';

  protected options = {
    'Title (Ascending)': 'title-asc',
    'Title (Descending)': 'title-desc',
    'Date of creation (Ascending)': 'createdOn-asc',
    'Date of creation (Descending)': 'createdOn-desc',
    'Last updated (Ascending)': 'updatedOn-asc',
    'Last updated (Descending)': 'updatedOn-desc',
  };

  protected get sortOrder() { return `${this.sort}-${this.order}` }

  /**
   * *Updates the ``sort`` and ``order`` properties with the input, 
   * the URL's string queries, and the catalogue with
   * the respective quizzes
   * @param value the new sort category and order
   */
  changeSortAndOrder(value: string): void {
    const query = value.split('-') as [sort, order];

    this.sort = query[0];
    this.order = query[1];

    // const url = this.updateURL();
    // history.pushState({}, '', url);

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        page: this.page,
        order: this.order,
        sort: this.sort,
      },
      skipLocationChange: false,
    });
  }

  /**
   * Updates the ``page`` property with the input, 
   * the URL's string queries, and the catalogue with
   * the respective quizzes
   * @param page the new page
   */
  changePage(page: number): void {
    this.page = page;

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        page: this.page,
        order: this.order,
        sort: this.sort,
      },
      skipLocationChange: false,
    });
  }
}
