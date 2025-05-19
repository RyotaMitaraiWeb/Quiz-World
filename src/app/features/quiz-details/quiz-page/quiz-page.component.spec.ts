import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';

import { QuizPageComponent } from './quiz-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { of } from 'rxjs';
import { IQuizDetails } from '../../../../types/responses/quiz.types';
import { questionTypes, shortQuestionTypes } from '../../../constants/question-types.constants';
import { AppStoreModule } from '../../../store/app-store.module';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../../types/store/store.types';
import { setUser } from '../../../store/user/user.action';
import { roles } from '../../../constants/roles.constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

function generateQuiz(): IQuizDetails {
  return {
    id: 1,
    title: 'test',
    description: 'test',
    instantMode: true,
    creatorId: '1',
    creatorUsername: 'ryota1',
    version: 1,
    questions: [
      {
        id: '1',
        prompt: 'question #1',
        type: shortQuestionTypes[questionTypes.single],
        notes: '',
        answers: [
          {
            value: 'a',
            id: '1',
          },
          {
            value: 'b',
            id: '2',
          }
        ]
      },
      {
        id: '2',
        prompt: 'question #2',
        type: shortQuestionTypes[questionTypes.multi],
        notes: '',
        answers: [
          {
            value: 'a',
            id: '3',
          },
          {
            value: 'b',
            id: '4',
          },
          {
            value: 'c',
            id: '5',
          },
        ]
      },
      {
        id: '3',
        prompt: 'question #3',
        type: shortQuestionTypes[questionTypes.text],
        notes: '',
      }
    ],
  }
}

describe('QuizPageComponent', () => {
  let component: QuizPageComponent;
  let fixture: ComponentFixture<QuizPageComponent>;
  let loader: HarnessLoader;
  let element: HTMLElement;
  let store: Store<IAppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        QuizPageComponent,
        RouterTestingModule,
        AppStoreModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: { duration: 0 }, // or whatever duration you want
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(QuizPageComponent);
    element = fixture.debugElement.nativeElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(Store<IAppStore>);

    component = fixture.componentInstance;
    spyOn(component, 'getResolvedData').and.returnValue(
      of(
        {
          quiz: {
            id: 0,
            title: '',
            description: '',
            instantMode: true,
            creatorId: '',
            creatorUsername: 'ryota1',
            version: 1,
            questions: [],
          } as IQuizDetails
        }
      )
    )
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    describe('ngOnInit', () => {
      it('Sets quiz property to whatever data the route has', waitForAsync(() => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of({
            quiz: generateQuiz()
          })
        );

        component.ngOnInit();
        expect(component.quiz.id).toBe(1);
      }));
    })
  });

  describe('Component tests', () => {
    describe('details tab', () => {
      it('Renders the details tab properly', waitForAsync(() => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of({
            quiz: generateQuiz()
          })
        );

        component.ngOnInit();
        fixture.detectChanges();

        const title = element.querySelector('.title');
        expect(title?.textContent).toBe('test');

        const description = element.querySelector('.description');
        expect(description?.textContent).toBe('test');

        const instantModeChip = element.querySelector('.instant-mode-chip');
        expect(instantModeChip).not.toBeNull();

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');

        expect(deleteBtn).toBeNull();
        expect(editBtn).toBeNull();
      }));

      it('Does not render instant mode chip if quiz is not in instant mode', waitForAsync(() => {
        const quiz = generateQuiz();
        quiz.instantMode = false;

        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of({
            quiz
          })
        );

        component.ngOnInit();
        fixture.detectChanges();

        const title = element.querySelector('.title');
        expect(title?.textContent).toBe('test');

        const instantModeChip = element.querySelector('.instant-mode-chip');
        expect(instantModeChip).toBeNull();
      }));

      it('Renders edit and delete buttons if the user\'s id matches the quiz\'s creator id', waitForAsync(async () => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of({
            quiz: generateQuiz()
          })
        );

        store.dispatch(setUser({
          id: '1',
          username: 'test',
          roles: [roles.user]
        }));

        fixture.detectChanges();

        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable();

        const deleteBtn = element.querySelector('.delete-button');
        const editBtn = element.querySelector('.edit-button');

        expect(deleteBtn).not.toBeNull();
        expect(editBtn).not.toBeNull();
      }));

      it('Renders edit and delete buttons if the user is a moderator (even if IDs do not match)', waitForAsync(async () => {
        component.getResolvedData = jasmine.createSpy().and.returnValue(
          of({
            quiz: generateQuiz()
          })
        );

        store.dispatch(setUser({
          id: '2',
          username: 'test',
          roles: [roles.moderator, roles.user]
        }));

        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable();

        const deleteBtn = element.querySelector('.delete-button');
        const editBtn = element.querySelector('.edit-button');

        expect(deleteBtn).not.toBeNull();
        expect(editBtn).not.toBeNull();
      }));
    });
  });
});
