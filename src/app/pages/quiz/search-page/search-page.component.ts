import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Subscription, switchMap } from 'rxjs';
import { SearchResultsComponent } from '../../../components/search/search-results/search-results.component';
import { SearchResultsService } from '../../../services/search-results/search-results.service';
import { QuizService } from '../../../services/quiz/quiz.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-page',
  imports: [
    AsyncPipe,
    SearchResultsComponent,
],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnDestroy, OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly quizService = inject(QuizService);
  private readonly queryParams = this.activatedRoute.queryParamMap;
  private readonly searchResults = inject(SearchResultsService);
  private readonly title = inject(Title);

  protected readonly searchQuery = this.queryParams.pipe(
    map(qp => qp.get('query') || ''),
  );

  private readonly searchParams = combineLatest([this.searchQuery, this.searchResults.searchOptions$])
    .pipe(
      map(value => (
        { ...value[1], search: value[0] }
      ),
  ));

  protected readonly searchResults$ = this.searchParams
    .pipe(
      switchMap((params) => (
        this.quizService.search({...params, title: params.search })
      )),
    );

  ngOnInit() {
    this.searchQuerySub = this.searchQuery.subscribe(query => {
      this.title.setTitle(`Search results for "${query}" | Quiz World`);
    });
  }

  ngOnDestroy() {
    this.searchQuerySub?.unsubscribe();
  }

  searchQuerySub?: Subscription;
}
