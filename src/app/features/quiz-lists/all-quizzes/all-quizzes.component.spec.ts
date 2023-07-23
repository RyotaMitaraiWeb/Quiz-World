import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllQuizzesComponent } from './all-quizzes.component';
import { AppStoreModule } from '../../../store/app-store.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizService } from '../../quiz-service/quiz.service';
import { Observable, generate, of } from 'rxjs';
import { IQuizList, IQuizListItem, order, sort } from '../../../../types/others/lists.types';
import { Location } from '@angular/common';
import { MatSelectHarness } from '@angular/material/select/testing';
import { fetchAllQuizzesResolver } from '../../../util/resolvers/fetch-all-quizzes/fetch-all-quizzes.resolver';

function generateQuizzes(n: number, reverse = false): IQuizList {
  const quizzes: IQuizListItem[] = [];
  for (let i = 0; i < n; i++) {
    quizzes.push(
      {
        id: i,
        title: `${i}`,
        description: 'wewehwehwe',
        createdOn: Date.now().toString(),
        updatedOn: Date.now().toString(),
        instantMode: true,
      }
    );
  }

  if (reverse) {
    quizzes.reverse();
  }
  
  return {
    total: 10,
    quizzes,
  };
}

describe('AllQuizzesComponent', () => {
  let component: AllQuizzesComponent;
  let fixture: ComponentFixture<AllQuizzesComponent>;

  let location: Location;
  let quizService: QuizService;
  let activatedRoute: ActivatedRoute;
  let loader: HarnessLoader;

  let element: HTMLElement;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AllQuizzesComponent,
        AppStoreModule,
        RouterModule.forRoot([
          {
            path: '',
            component: AllQuizzesComponent,
          },
          {
            path: 'test',
            component: AllQuizzesComponent,
            data: {
              catalogue: generateQuizzes(7)
            }
          }
        ]),
        NoopAnimationsModule,
        HttpClientTestingModule
      ],

    });

    fixture = TestBed.createComponent(AllQuizzesComponent);
    quizService = TestBed.inject(QuizService);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);

    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    spy = spyOn(component, 'getResolvedData').and.returnValue(
      of(
        {
          catalogue: {
            total: 0,
            quizzes: []
          }
        }
      )
    );
    element = fixture.debugElement.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('ngOnInit', () => {
      it('Sets all relevant properties based on query parameters', () => {
        spyOn(component, 'getQueryString')
          .withArgs('page')
          .and.returnValue('121')
          .withArgs('sort')
          .and.returnValue('createdOn')
          .withArgs('order')
          .and.returnValue('desc');

        component.ngOnInit();

        expect(component.page).toBe(121);
        expect(component.sort).toBe('createdOn');
        expect(component.order).toBe('desc');
      });

      it('Sets all relevant properties from query parameters to default values if the query params are missing', () => {
        spyOn(component, 'getQueryString')
          .withArgs('page')
          .and.returnValue(null)
          .withArgs('sort')
          .and.returnValue(null)
          .withArgs('order')
          .and.returnValue(null);

        component.ngOnInit();

        expect(component.page).toBe(1);
        expect(component.sort).toBe('title');
        expect(component.order).toBe('asc');
      });

      it('Sets the catalogue to whatever data the route has', () => {

        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of({
            catalogue: generateQuizzes(7)
          })
        );

        component.ngOnInit();
        expect(component.catalogue.total).toBe(10);
      });
    });

    describe('changePage', () => {
      it('Sets the page and catalogue properties when called', () => {
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
          of(
            {
              total: 3,
              quizzes: [
                {
                  title: 'a',
                }
              ]
            } as IQuizList
          )
        );

        spyOn(location, 'replaceState').and.stub();

        component.changePage(2);

        expect(component.page).toBe(2);
        expect(component.catalogue.total).toBe(3);
        expect(location.replaceState).toHaveBeenCalled();
      });

      it('Sets the page property even if request fails', () => {
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
          new Observable(o => {
            o.error('getAllQuizzes failed');
          })
        );

        spyOn(location, 'replaceState').and.stub();

        component.changePage(2);

        expect(component.page).toBe(2);
        expect(location.replaceState).toHaveBeenCalled();
      });
    });

    describe('changeSortAndOrder', () => {
      it('Changes the sort, order, and catalogue properties when called', () => {
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
          of(
            {
              total: 3,
              quizzes: [
                {
                  title: 'a',
                }
              ]
            } as IQuizList
          )
        );

        spyOn(location, 'replaceState').and.stub();

        component.changeSortAndOrder({ sort: 'createdOn', order: 'desc' });

        expect(component.sort).toBe('createdOn');
        expect(component.order).toBe('desc');

        expect(component.catalogue.total).toBe(3);
        expect(location.replaceState).toHaveBeenCalled();
      });

      it('Changes the sort and order properties even if request fails', () => {
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
          new Observable(o => {
            o.error('getAllQuizzes failed');
          })
        );

        spyOn(location, 'replaceState').and.stub();

        component.changeSortAndOrder({ sort: 'createdOn', order: 'desc' });

        expect(component.sort).toBe('createdOn');
        expect(component.order).toBe('desc');

        expect(location.replaceState).toHaveBeenCalled();
      });
    });
  });

  describe('Component tests', () => {
    describe('component initilization', () => {
      it('Sets paginator to correct page based on query string', waitForAsync(async () => {
        const paginators = await loader.getAllHarnesses(MatPaginatorHarness);
        const paginator = paginators[0];

        spyOn(component, 'getQueryString')
          .withArgs('page')
          .and.returnValue('3')
          .withArgs('sort')
          .and.returnValue(null)
          .withArgs('order')
          .and.returnValue(null);

        component.ngOnInit();
        fixture.detectChanges();

        component.catalogue.total = 100;
        fixture.detectChanges();

        await paginator.goToNextPage();

        expect(component.page).toBe(4);
      }));

      it('Sets the select menu to the correct option based on query string', waitForAsync(async () => {
        const selectMenus = await loader.getAllHarnesses(MatSelectHarness);
        const menu = selectMenus[0];

        spyOn(component, 'getQueryString')
          .withArgs('page')
          .and.returnValue('3')
          .withArgs('sort')
          .and.returnValue('createdOn')
          .withArgs('order')
          .and.returnValue('desc');

        component.ngOnInit();
        fixture.detectChanges();

        await fixture.whenStable();

        await menu.open();
        fixture.detectChanges()
        const value = await menu.getValueText();
        fixture.detectChanges();
        expect(value).toBe('Date of creation (Descending)');
      }));

      it('Populates the page with quizzes from route data', waitForAsync(async () => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of({
            catalogue: generateQuizzes(7)
          })
        );

        component.ngOnInit();
        fixture.detectChanges();

        await fixture.whenStable();

        const items = element.querySelectorAll('.quiz-list-item');
        expect(items.length).toBe(7);
      }));
    });

    describe('interaction', () => {
      it('Reacts correctly to change in quiz list items due to page change', waitForAsync(async () => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of(
            {
              catalogue: generateQuizzes(7)
            }
          )
        );
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
          of(generateQuizzes(3))
        );

        const paginators = await loader.getAllHarnesses(MatPaginatorHarness);
        const paginator = paginators[0];

        component.ngOnInit();
        fixture.detectChanges();

        await paginator.goToNextPage();
        fixture.detectChanges();

        await fixture.whenStable();

        const items = element.querySelectorAll('.quiz-list-item');
        expect(items.length).toBe(3);

        const path = location.path();
        expect(path.includes('page=2')).toBeTrue();
      }));

      it('Reacts correctly to change in quiz list items due to menu change', waitForAsync(async () => {
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
          of(generateQuizzes(7))
        ).and.returnValue(
          of(generateQuizzes(7, true))
        );

        const menu = await loader.getHarness(MatSelectHarness);

        component.ngOnInit();
        fixture.detectChanges();

        await menu.open();
        fixture.detectChanges();

        const options = await menu.getOptions();
        await options[1].click();
        fixture.detectChanges();

        const items = element.querySelectorAll('.quiz-list-item');
        expect(items.length).toBe(7);

        const path = location.path();
        expect(path.includes('sort=title')).toBeTrue();
        expect(path.includes('order=desc')).toBeTrue();

        const title = items[0].querySelector('.title')?.textContent;
        expect(title).toBe('6');
      }));
    });
  });
});
