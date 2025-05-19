import { ChangeDetectionStrategy, Component, inject, input, OnInit, OnDestroy, signal } from '@angular/core';
import { UserState } from '../../../store/user/user.store';
import { SearchResultsService } from '../../../services/search-results/search-results.service';
import { QuizService } from '../../../services/quiz/quiz.service';
import { combineLatest, filter, map, Subscription, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { QuizList } from '../../../services/quiz/types';
import { SearchResultsComponent } from '../../search/search-results/search-results.component';

@Component({
  selector: 'app-user-quizzes-list',
  imports: [SearchResultsComponent],
  templateUrl: './user-quizzes-list.component.html',
  styleUrl: './user-quizzes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserQuizzesListComponent implements OnInit, OnDestroy {
  user = input.required<UserState>();
  private readonly user$ = toObservable(this.user);
  private readonly searchResults = inject(SearchResultsService);
  private readonly quizService = inject(QuizService);
  private readonly searchParams$ = combineLatest(
    [this.user$, this.searchResults.searchOptions$],
  ).pipe(map(value => (
    {
      user: value[0],
      search: value[1],
    }
  )));

  _searchSub?: Subscription;

  readonly quizList = signal<QuizList>(
    {
      total: 0,
      quizzes: [],
    },
  );

  ngOnInit() {
    this._searchSub = this.searchParams$
      .pipe(
        filter(value => value.user.id !== ''),
        switchMap(value => this.quizService.getUserQuizzes(value.user.id, value.search)),
      )
      .subscribe({
        next: (value) => {
          this.quizList.set(value);
        },
        error() {
          //
        },
      });
  }

  ngOnDestroy() {
    this._searchSub?.unsubscribe();
  }
}
