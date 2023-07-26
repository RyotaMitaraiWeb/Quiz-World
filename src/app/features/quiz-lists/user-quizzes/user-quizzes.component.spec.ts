import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserQuizzesComponent } from './user-quizzes.component';
import { AppStoreModule } from '../../../store/app-store.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IProfile, IQuizList, IQuizListItem } from '../../../../types/others/lists.types';
import { QuizService } from '../../quiz-service/quiz.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { roles } from '../../../constants/roles.constants';

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

describe('UserQuizzesComponent', () => {
  let component: UserQuizzesComponent;
  let fixture: ComponentFixture<UserQuizzesComponent>;
  let quizService: QuizService;
  let element: HTMLElement;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserQuizzesComponent,
        AppStoreModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],

    });

    quizService = TestBed.inject(QuizService);
    fixture = TestBed.createComponent(UserQuizzesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    loader = TestbedHarnessEnvironment.loader(fixture);

    spyOn(component, 'getResolvedData').and.returnValue(
      of(
        {
          profile: {
            id: '',
            username: '',
            roles: [],
            quizzes:
              {
                total: 0,
                quizzes: []
              }
          } as IProfile
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
              profile:
              {
                id: '1',
                username: 'test',
                roles: [roles.user],
                quizzes: generateQuizzes(10),
              } as IProfile
            }
          )
        );
  
        component.ngOnInit();
        expect(component.catalogue.total).toBe(10);
        expect(component.user.id).toBe('1');
      }));
    });
  
    describe('updateQuizzes', () => {
      it('Updates the catalogue property successfully', waitForAsync(() => {
        spyOn(quizService, 'getUserQuizzes').and.returnValue(
          of(generateQuizzes(3))
        );
  
        component.updateQuizzes({ page: 2, sort: 'createdOn', order: 'desc'});
        expect(component.catalogue.total).toBe(10);
      }));
    });
  });

  describe('Component tests', () => {
    describe('initilization', () => {
      it('Displays correct heading', waitForAsync(() => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of(
            {
              profile:
              {
                id: '1',
                username: 'test',
                roles: [roles.user],
                quizzes: generateQuizzes(10),
              } as IProfile
            }
          )
        );
        
        component.ngOnInit();
        fixture.detectChanges();
        const h1 = element.querySelector('h1');
        expect(h1?.textContent).toBe('test\'s quizzes');
      }));
    });
    describe('interaction', () => {
      it('Reacts correctly to change in quiz list items due to page change', waitForAsync(async () => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of(
            {
              profile:
              {
                id: '1',
                username: 'test',
                roles: [roles.user],
                quizzes: generateQuizzes(10),
              } as IProfile
            }
          )
        );
  
        spyOn(quizService, 'getUserQuizzes').and.returnValue(
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
              profile:
              {
                id: '1',
                username: 'test',
                roles: [roles.user],
                quizzes: generateQuizzes(10),
              } as IProfile
            }
          )
        );
        
        spyOn(quizService, 'getUserQuizzes').and.returnValue(
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
        expect(title).toBe('6');
      }));
    });
  });
});
