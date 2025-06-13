import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchResultsComponent } from '../../../components/search/search-results/search-results.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { SearchResultsService } from '../../../services/search-results/search-results.service';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-all-page',
  imports: [
    AsyncPipe,
    SearchResultsComponent,
  ],
  templateUrl: './all-page.component.html',
  styleUrl: './all-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPageComponent {
  private readonly quizService = inject(QuizService);
  private readonly searchResults = inject(SearchResultsService);

  protected readonly results$ = this.searchResults.searchOptions$
    .pipe(
      switchMap((params) => (
        this.quizService.search(params)
      )),
  );
}


