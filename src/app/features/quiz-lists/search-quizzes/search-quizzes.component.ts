import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, Data } from '@angular/router';
import { QuizService } from '../../quiz-service/quiz.service';
import { Observable, Subscription } from 'rxjs';
import { IQuizList, order, sort } from '../../../../types/others/lists.types';

@Component({
  selector: 'app-search-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './search-quizzes.component.html',
  styleUrls: ['./search-quizzes.component.scss']
})
export class SearchQuizzesComponent implements OnInit, OnDestroy {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly quizService: QuizService,
  ) { }

  private catalogueSub = new Subscription();

  catalogue: IQuizList = {
    total: 0,
    quizzes: [],
  };

  /**
   * Returns the value of the querys tring ``query`` from the URL or an empty
   * string if the query is absent.
   */
  get titleQuery(): string {
    const url: URL = new URL(window.top?.location.href || '');
    const params: URLSearchParams = url.searchParams;
    return params.get('search') || '';
  }
  
  ngOnInit(): void {
    this.catalogueSub = this.getResolvedData().subscribe(data => {
      this.catalogue = data['catalogue'];
    });
  }

  getResolvedData(): Observable<Data> {
    return this.activatedRoute.data;
  }

  updateQuizzes({ page, sort, order }: { page: number, sort: sort, order: order } ): void {
    this.catalogueSub = this.quizService.getQuizzesByTitle(this.titleQuery, page, sort, order).subscribe(data => {
      this.catalogue = data
    });
  }

  ngOnDestroy(): void {
    this.catalogueSub.unsubscribe();
  }
}
