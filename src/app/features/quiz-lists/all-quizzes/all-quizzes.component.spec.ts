import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllQuizzesComponent } from './all-quizzes.component';
import { AppStoreModule } from '../../../store/app-store.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CatalogueModule } from '../../../shared/catalogue/catalogue.module';
import { CataloguePaginatorComponent } from '../../../shared/catalogue-paginator/catalogue-paginator.component';
import { CatalogueSelectMenuComponent } from '../../../shared/catalogue-select-menu/catalogue-select-menu.component';
import { CatalogueComponent } from '../../../shared/catalogue/catalogue.component';
import { SharedModule } from '../../../shared/shared.module';
import { of } from 'rxjs';
import { IQuizList, IQuizListItem } from '../../../../types/others/lists.types';
import { QuizService } from '../../quiz-service/quiz.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
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

describe('AllQuizzesComponent', () => {
  let component: AllQuizzesComponent;
  let fixture: ComponentFixture<AllQuizzesComponent>;
  let quizService: QuizService;
  let element: HTMLElement;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AllQuizzesComponent,
        AppStoreModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],

    });

    quizService = TestBed.inject(QuizService);
    fixture = TestBed.createComponent(AllQuizzesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    loader = TestbedHarnessEnvironment.loader(fixture);

    spyOn(component, 'getResolvedData').and.returnValue(
      of(
        {
          catalogue:
            {
              total: 0,
              quizzes: []
            } as IQuizList
        }
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('ngOnInit', () => {
      it('Retrieves data from route correctly', waitForAsync(() => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of(
            {
              catalogue: generateQuizzes(3)
            }
          )
        );
  
        component.ngOnInit();
        expect(component.catalogue.total).toBe(10);
      }));
    });
  
    describe('updateQuizzes', () => {
      it('Updates the catalogue property successfully', waitForAsync(() => {
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
          of(generateQuizzes(3))
        );
  
        component.updateQuizzes({ page: 2, sort: 'createdOn', order: 'desc'});
        expect(component.catalogue.total).toBe(10);
      }));
    });
  });

  describe('Component tests', () => {
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
      }));

      it('Reacts correctly to change in quiz list items due to menu change', waitForAsync(async () => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of(
            {
              catalogue: generateQuizzes(7)
            }
          )
        );
        
        spyOn(quizService, 'getAllQuizzes').and.returnValue(
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

        const title = items[0].querySelector('.title')?.textContent;
        expect(title?.includes('6')).toBeTrue();
      }));
    });
  });
});
