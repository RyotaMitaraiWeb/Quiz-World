import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { SortAndOrder } from '../../../common/sort';
import { SearchQuizSorterComponent } from '../search-quiz-sorter/search-quiz-sorter.component';
import { AsyncPipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SearchResultsService } from '../../../services/search-results/search-results.service';
import { QuizList } from '../../../services/quiz/types';
import { SearchResultCardComponent } from '../search-result-card/search-result-card.component';

@Component({
  selector: 'app-search-results',
  imports: [AsyncPipe, MatPaginatorModule, SearchQuizSorterComponent, SearchResultCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  routeToNavigate = input.required<string[]>();
  quizList = input.required<QuizList>();

  protected readonly quizzes = computed(() => this.quizList().quizzes);
  protected readonly totalQuizzes = computed(() => this.quizList().total);

  private readonly router = inject(Router);
  private readonly searchResults = inject(SearchResultsService);

  search(options: SortAndOrder) {
    this.router.navigate(this.routeToNavigate(), {
      queryParams: options,
      queryParamsHandling: 'merge',
    });
  }

  paginate(event: PageEvent) {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.router.navigate(this.routeToNavigate(), {
      queryParams: { page, pageSize },
      queryParamsHandling: 'merge',
    });
  }

  protected readonly searchOptions$ = this.searchResults.searchOptions$;
}
