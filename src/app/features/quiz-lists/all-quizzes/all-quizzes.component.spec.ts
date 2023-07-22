import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuizzesComponent } from './all-quizzes.component';
import { AppStoreModule } from '../../../store/app-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../quiz-service/quiz.service';
import { Observable, of } from 'rxjs';
import { IQuizList, order, sort } from '../../../../types/others/lists.types';
import { Location } from '@angular/common';

describe('AllQuizzesComponent', () => {
  let component: AllQuizzesComponent;
  let fixture: ComponentFixture<AllQuizzesComponent>;

  let location: Location;
  let quizService: QuizService;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AllQuizzesComponent,
        AppStoreModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ]
    });

    fixture = TestBed.createComponent(AllQuizzesComponent);
    quizService = TestBed.inject(QuizService);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('ngOnInit', () => {
      it('Sets all relevant properties based on query parameters', () => {
        spyOn(activatedRoute.snapshot.queryParamMap, 'get').withArgs('page')
          .and.returnValue('121')
          .withArgs('sort')
          .and.returnValue('createdOn')
          .withArgs('order')
          .and.returnValue('desc')

        component.ngOnInit();

        expect(component.page).toBe(121);
        expect(component.sort).toBe('createdOn');
        expect(component.order).toBe('desc');
      });

      it('Sets all relevant properties from query parameters to default values if the query params are missing', () => {
        spyOn(activatedRoute.snapshot.queryParamMap, 'get').withArgs('page')
          .and.returnValue(null)
          .withArgs('sort')
          .and.returnValue(null)
          .withArgs('order')
          .and.returnValue(null)

        component.ngOnInit();

        expect(component.page).toBe(1);
        expect(component.sort).toBe('title');
        expect(component.order).toBe('asc');
      });

      it('Sets the catalogue property to whatever is in the route data', () => {
        spyOn(component, 'getResolvedData').and.returnValue(
          new Observable(o => {
            o.next(
              {
                catalogue:
                  {
                    total: 1,
                    quizzes: [
                      {
                        title: 'a',
                        description: 'a',
                        createdOn: Date.now.toString(),
                        updatedOn: Date.now.toString(),
                        instantMode: true,
                        id: 1,
                      }
                    ]
                  } as IQuizList
              }
            )
          })
        );

        component.ngOnInit();
        expect(component.catalogue.total).toBe(1);
        expect(component.catalogue.quizzes[0].title).toBe('a');
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
    });
  });
  
});
