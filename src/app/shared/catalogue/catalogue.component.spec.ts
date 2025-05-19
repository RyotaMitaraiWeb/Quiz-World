import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogueComponent } from './catalogue.component';
import { AppStoreModule } from '../../store/app-store.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../features/quiz-service/quiz.service';
import { Observable, of } from 'rxjs';
import { IQuizList, IQuizListItem } from '../../../types/others/lists.types';
import { Location } from '@angular/common';
import { MatSelectHarness } from '@angular/material/select/testing';

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

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;

  let loader: HarnessLoader;

  let element: HTMLElement;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CatalogueComponent,
        AppStoreModule,
        RouterModule.forRoot([
          {
            path: '',
            component: CatalogueComponent,
          },
          {
            path: 'test',
            component: CatalogueComponent,
            data: {
              catalogue: generateQuizzes(7)
            }
          }
        ]),
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],

    });

    fixture = TestBed.createComponent(CatalogueComponent);
    router = TestBed.inject(Router);

    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    
    element = fixture.debugElement.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('ngOnInit', () => {
      it('Sets all relevant properties based on query parameters', () => {
        spyOn(component, 'getQueryParams').and.returnValue(
          of({
            page: '121',
            sort: 'createdOn',
            order: 'desc',
          })
        );

        component.ngOnInit();

        expect(component.page).toBe(121);
        expect(component.sort).toBe('createdOn');
        expect(component.order).toBe('desc');
      });

      it('Sets all relevant properties from query parameters to default values if the query params are missing', () => {
        spyOn(component, 'getQueryParams').and.returnValue(
          of({
            page: undefined,
            sort: undefined,
            order: undefined,
          })
        );

        component.ngOnInit();

        expect(component.page).toBe(1);
        expect(component.sort).toBe('title');
        expect(component.order).toBe('asc');
      });
    });

    describe('changePage', () => {
      it('Sets the page property when called', () => {
        spyOn(router, 'navigate').and.stub();

        component.changePage(2);
        
        expect(component.page).toBe(2);
        expect(router.navigate).toHaveBeenCalled();
      });
    });

    describe('changeSortAndOrder', () => {
      it('Changes the sort and order properties when called', () => {
        spyOn(router, 'navigate').and.stub();
        component.changeSortAndOrder('createdOn-desc');

        expect(component.sort).toBe('createdOn');
        expect(component.order).toBe('desc');

        expect(router.navigate).toHaveBeenCalled();
      });
    });
  });

  describe('Component tests', () => {
    describe('component initilization', () => {
      it('Sets paginator to correct page based on query string', waitForAsync(async () => {
        router.navigate(['/test'], {
          queryParams: {
            page: '3'
          }
        });
        fixture.detectChanges();

        const paginators = await loader.getAllHarnesses(MatPaginatorHarness);
        const paginator = paginators[0];

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

        spyOn(component, 'getQueryParams')
          .and.returnValue(of({
            page: '3',
            sort: 'createdOn',
            order: 'desc'
          }));

        component.ngOnInit();
        fixture.detectChanges();

        await fixture.whenStable();

        await menu.open();
        fixture.detectChanges()
        const value = await menu.getValueText();
        fixture.detectChanges();
        expect(value).toBe('Date of creation (Descending)');
      }));

      it('Populates the page with quizzes from Input property', waitForAsync(async () => {
        component.catalogue = generateQuizzes(7);
        component.ngOnInit();
        fixture.detectChanges();

        await fixture.whenStable();

        const items = element.querySelectorAll('.quiz-list-item');
        expect(items.length).toBe(7);

        component.catalogue = generateQuizzes(3);
        fixture.detectChanges();

        const items2 = element.querySelectorAll('.quiz-list-item');
        expect(items2.length).toBe(3);
      }));

      it('Displays a special message if there are no quizzes', () => {
        component.catalogue = {
          total: 0,
          quizzes: [],
        };

        component.ngOnInit();
        fixture.detectChanges();

        const message = element.querySelector('.no-quizzes');
        expect(message).not.toBeNull();

        component.catalogue = {
          total: 1,
          quizzes: [
            {
              id: 1,
              title: 'a',
              description: 'a',
              createdOn: Date.now().toString(),
              updatedOn: Date.now().toString(),
              instantMode: true,
            }
          ],
        };

        component.ngOnInit();
        fixture.detectChanges();

        const message2 = element.querySelector('.no-quizzes');
        expect(message2).toBeNull();
      });
    });
  });
});
