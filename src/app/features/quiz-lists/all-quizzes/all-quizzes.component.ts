import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { IQuizList, IQuizListItem, order, sort } from '../../../../types/others/lists.types';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../quiz-service/quiz.service';
import { Subscription, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ISort } from '../../../../types/components/catalogue-select-menu.types';

@Component({
  selector: 'app-all-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.scss']
})
export class AllQuizzesComponent implements OnInit, OnDestroy {
  constructor(
    private readonly location: Location,
    private readonly quizService: QuizService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  private routerSub: Subscription = new Subscription();
  private catalogueSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.page = Number(this.getQueryString('page')) || 1;
    this.sort = this.getQueryString('sort') as sort || 'title';
    this.order = this.getQueryString('order') as order || 'asc';

    this.catalogueSub = this.getResolvedData().subscribe(data => {
      this.catalogue = data['catalogue'];
    });
  }

  /**
   * returns the resolved data from the activated route. This is used
   * for easier spying in tests.
   */
  getResolvedData() {
    return this.activatedRoute.data;
  }

  /**
   * Returns the given query string from the URL.
   * @param query 
   * @returns the query string or null if the query string is absent from the URL.
   */
  getQueryString(query: string) {
    const url: URL = new URL(window.top?.location.href || '');
    const params: URLSearchParams = url.searchParams;
    return params.get(query);
  }

  catalogue: IQuizList = {
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
  changeSortAndOrder(value: ISort) {
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

    this.updateQuizzes();
  }

  /**
   * Updates the ``page`` property with the input, 
   * the URL's string queries, and the catalogue with
   * the respective quizzes
   * @param page the new page
   */
  changePage(page: number) {
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

    this.updateQuizzes();
  }

  private updateQuizzes() {
    this.catalogueSub = this.quizService
      .getAllQuizzes(this.page, this.sort, this.order)
      .subscribe(
        {
          next: res => {
            this.catalogue = res;
          },
          error: err => {
            console.warn(err);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.catalogueSub.unsubscribe();
  }

}
