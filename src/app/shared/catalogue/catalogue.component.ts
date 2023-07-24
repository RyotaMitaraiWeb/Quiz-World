import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IQuizList, order, sort } from '../../../types/others/lists.types';
import { HttpParams } from '@angular/common/http';
import { ISort } from '../../../types/components/catalogue-select-menu.types';
import { CataloguePaginatorModule } from '../catalogue-paginator/catalogue-paginator.module';
import { CatalogueSelectMenuComponent } from '../catalogue-select-menu/catalogue-select-menu.component';
import { QuizListItemComponent } from '../quiz-list-item/quiz-list-item.component';
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
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  constructor(
    private readonly location: Location,
  ) { }

  @Output() updateQuizzesEvent = new EventEmitter<
    {
      page: number,
      sort: sort,
      order: order,
    }
  >

  ngOnInit(): void {
    this.page = Number(this.getQueryString('page')) || 1;
    this.sort = this.getQueryString('sort') as sort || 'title';
    this.order = this.getQueryString('order') as order || 'asc';
  }

  /**
   * Returns the given query string from the URL.
   * @param query 
   * @returns the query string or null if the query string is absent from the URL.
   */
  getQueryString(query: string): string | null {
    const url: URL = new URL(window.top?.location.href || '');
    const params: URLSearchParams = url.searchParams;
    return params.get(query);
  }

  @Input({ required: true }) catalogue: IQuizList = {
    total: 0,
    quizzes: [],
  };

  page = 0;
  sort: sort = 'title';
  order: order = 'asc';

  protected get sortOrder() { return `${this.sort}-${this.order}` }

  /**
   * *Updates the ``sort`` and ``order`` properties with the input, 
   * the URL's string queries, and the catalogue with
   * the respective quizzes
   * @param value the new sort category and order
   */
  changeSortAndOrder(value: ISort): void {
    this.sort = value.sort;
    this.order = value.order;

    const params = new HttpParams().appendAll(
      {
        page: this.page.toString(),
        sort: this.sort,
        order: this.order,
      },
    );

    this.location.replaceState(
      location.pathname,
      params.toString()
    );

    this.updateQuizzesEvent.emit({ page: this.page, sort: this.sort, order: this.order });
  }

  /**
   * Updates the ``page`` property with the input, 
   * the URL's string queries, and the catalogue with
   * the respective quizzes
   * @param page the new page
   */
  changePage(page: number): void {
    this.page = page;
    const params = new HttpParams().appendAll(
      {
        page: this.page.toString(),
        sort: this.sort,
        order: this.order,
      },
    );

    this.location.replaceState(
      location.pathname,
      params.toString()
    );

    this.updateQuizzesEvent.emit({ page: this.page, sort: this.sort, order: this.order });
  }

}
