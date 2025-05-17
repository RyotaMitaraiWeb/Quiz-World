import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { QuizList } from '../../../services/quiz/types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SearchQuizSorterHarness } from '../search-quiz-sorter/search-quiz-sorter.harness.component';
import { sorting } from '../../../common/sort';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let loader: HarnessLoader;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent, NoopAnimationsModule],
      providers: [provideRouter([
        {
          path: 'test',
          component: SearchResultsComponent,
        },
      ])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Displays a special message if there are no quizzes', () => {
    fixture.componentRef.setInput('routeToNavigate', 'test');

    const quizList: QuizList = {
      total: 0,
      quizzes: [],
    };

    fixture.componentRef.setInput('quizList', quizList);
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('.no-quizzes')).nativeElement as HTMLParagraphElement;

    expect(message).not.toBeNull();
  });

  it('behaves correctly when the sort by option is changed', async () => {
    fixture.componentRef.setInput('routeToNavigate', ['test']);

    const quizList: QuizList = {
      total: 0,
      quizzes: [],
    };

    fixture.componentRef.setInput('quizList', quizList);
    fixture.detectChanges();

    const select = await loader.getHarness(SearchQuizSorterHarness);
    await select.select(1);

    const params = activatedRoute.snapshot.queryParams;

    expect(params['sort']).toBe(sorting.categories[0]);
    expect(params['order']).toBe(sorting.order[1]);
  });
});
