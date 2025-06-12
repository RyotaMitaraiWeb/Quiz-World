import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UserState } from '../../../store/user/user.store';
import { SearchResultsService } from '../../../services/search-results/search-results.service';
import { QuizService } from '../../../services/quiz/quiz.service';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { SearchResultsComponent } from '../../search/search-results/search-results.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-quizzes-list',
  imports: [
    AsyncPipe,
    SearchResultsComponent,
  ],
  templateUrl: './user-quizzes-list.component.html',
  styleUrl: './user-quizzes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserQuizzesListComponent {
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

  protected readonly searchResults$ = this.searchParams$
    .pipe(
        filter(value => value.user.id !== ''),
        switchMap(
          value => this.quizService.search({...value.search, author: value.user.username}),
        ),
    );
}
