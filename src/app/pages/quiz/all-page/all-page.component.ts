import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { SearchResultsComponent } from '../../../components/search/search-results/search-results.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { SearchResultsService } from '../../../services/search-results/search-results.service';
import { Subscription, switchMap } from 'rxjs';
import { QuizList } from '../../../services/quiz/types';

@Component({
  selector: 'app-all-page',
  imports: [SearchResultsComponent],
  templateUrl: './all-page.component.html',
  styleUrl: './all-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPageComponent implements OnDestroy, OnInit {
  private readonly quizService = inject(QuizService);
  private readonly searchResults = inject(SearchResultsService);

  quizList = signal<QuizList>(
    {
      total: 0,
      quizzes: [],
    },
  );

  ngOnInit() {
    this.searchResultsSub = this.searchResults.searchOptions$.pipe(
      switchMap((params) => (
        this.quizService.search(params)
      )),
    ).subscribe({
      next: (value) => {
        this.quizList.set(value);
      },
      error() {
        //
      },
    });

  }

  ngOnDestroy() {
    this.searchResultsSub?.unsubscribe();
  }

  searchResultsSub?: Subscription;
}


