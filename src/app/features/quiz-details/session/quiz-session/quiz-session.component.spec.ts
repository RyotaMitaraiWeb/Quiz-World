import { ComponentFixture, TestBed, tick, fakeAsync, async, waitForAsync } from '@angular/core/testing';

import { QuizSessionComponent } from './quiz-session.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnswerService } from '../../../answer-service/answer.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { IGradedAnswer, ISessionQuestion } from '../../../../../types/responses/quiz.types';
import { api } from '../../../../constants/api.constants';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { questionTypes, shortQuestionTypes } from '../../../../constants/question-types.constants';

const questions: ISessionQuestion[] = [
  {
    prompt: 'question #1',
    type: shortQuestionTypes[questionTypes.single],
    id: '1',
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
    prompt: 'question #2',
    type: shortQuestionTypes[questionTypes.multi],
    id: '2',
    notes: '',
    answers: [
      {
        id: '3',
        value: 'a',
      },
      {
        id: '4',
        value: 'b',
      },
      {
        id: '5',
        value: 'c',
      },
    ]
  },
  {
    prompt: 'question #3',
    type: shortQuestionTypes[questionTypes.text],
    id: '3',
    notes: '',
  }
];

describe('QuizSessionComponent', () => {
  let component: QuizSessionComponent;
  let fixture: ComponentFixture<QuizSessionComponent>;
  let answerService: AnswerService;
  const event = new Event('click');

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuizSessionComponent, HttpClientTestingModule]
      });
      fixture = TestBed.createComponent(QuizSessionComponent);
      answerService = TestBed.inject(AnswerService);
      component = fixture.componentInstance;
      fixture.detectChanges();

    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnInit implementation', () => {
      it('Correctly constructs a form based on @Input properties', () => {
        component.questions = questions;

        component.ngOnInit();

        expect(component.form.length).toBe(3);
        expect(component.form.controls[0].controls.type.value).toBe(shortQuestionTypes[questionTypes.single]);
        expect(component.form.controls[1].controls.type.value).toBe(shortQuestionTypes[questionTypes.multi]);
        expect(component.form.controls[2].controls.type.value).toBe(shortQuestionTypes[questionTypes.text]);
      });

      it('Correctly sets the questionKeys map', () => {
        component.questions = questions;

        component.ngOnInit();

        expect(component.questionKeys.get('1')).toBe(null);
        expect(component.questionKeys.get('2')).toBe(null);
        expect(component.questionKeys.get('3')).toBe(null);
        expect(component.questionKeys.size).toBe(3);
      });
    });

    describe('gradeQuestions', () => {
      it('Updates the questionKeys map if the answer service returns a list of correct answers and disables the form', () => {
        spyOn(answerService, 'getCorrectAnswersForAllQuestions').and.returnValue(
          new Observable(observer => {
            observer.next(new HttpResponse<IGradedAnswer[]>({
              status: HttpStatusCode.Ok,
              statusText: 'Ok',
              body: [
                {
                  id: '1',
                  answers: [
                    {
                      value: 'a',
                      id: '1',
                    },
                  ]
                },
                {
                  id: '2',
                  answers: [
                    {
                      id: '3',
                      value: 'a',
                    },
                    {
                      id: '4',
                      value: 'b',
                    },
                  ]
                },
                {
                  id: '3',
                  answers: [
                    {
                      id: '7',
                      value: 'test',
                    },
                    {
                      id: '8',
                      value: 'test2'
                    },
                  ],
                },
              ]
            }))
          })
        );

        component.gradeQuestions(event);

        const keys = component.questionKeys;
        expect(keys.get('1')).toEqual([
          {
            value: 'a',
            id: '1',
          },
        ]);

        expect(keys.get('2')).toEqual([
          {
            id: '3',
            value: 'a',
          },
          {
            id: '4',
            value: 'b',
          },
        ]);

        expect(keys.get('3')).toEqual([
          {
            id: '7',
            value: 'test',
          },
          {
            id: '8',
            value: 'test2'
          }
        ]);

        expect(component.form.disabled).toBeTrue();
      });

      it('Does not update the questionKeys if the answer service returns an error response and does not disable the form', () => {
        spyOn(answerService, 'getCorrectAnswersForAllQuestions').and.returnValue(
          new Observable(observer => {
            observer.error(new HttpErrorResponse({
              status: HttpStatusCode.Forbidden,
              statusText: 'Forbidden',
              error: ['Error']
            }))
          })
        );

        component.gradeQuestions(event);

        expect(component.questionKeys.size).toBe(0);
        expect(component.form.enabled).toBeTrue();
      });

      it('Does nothing if the quiz is in instant mode.', () => {
        component.instantMode = true;

        component.gradeQuestions(event);

        expect(component.questionKeys.size).toBe(0);
        expect(component.form.enabled).toBeTrue();
      });
    });
  });

  describe('Component tests', () => {
    let httpTestController: HttpTestingController;
    let element: HTMLElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          QuizSessionComponent,
          HttpClientTestingModule,
          NoopAnimationsModule
        ],
      });
      fixture = TestBed.createComponent(QuizSessionComponent);
      answerService = TestBed.inject(AnswerService);
      component = fixture.componentInstance;
      httpTestController = TestBed.inject(HttpTestingController);
      element = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });



    describe('Grade button', () => {
      it('Is disabled when the form is invalid and enabled when the form is valid', () => {
        component.form.setErrors({ required: true });
        component.instantMode = false;
        fixture.detectChanges();

        const button = element.querySelector('#grade-answers-btn') as HTMLButtonElement;
        expect(button.disabled).toBeTrue();

        component.form.setErrors(null);
        fixture.detectChanges();
        const enabledButton = element.querySelector('#grade-answers-btn') as HTMLButtonElement;

        expect(enabledButton.disabled).toBeFalse();
      });

      it('Clicking the button updates the questions\' status', waitForAsync(() => {
        component.instantMode = false;
        component.quizId = 1;
        component.version = 1;
        component.questions = [
          {
            prompt: 'question #1',
            id: '1',
            type: shortQuestionTypes[questionTypes.text],
            notes: '',
          },
        ];


        component.ngOnInit();

        fixture.detectChanges();

        const field = element.querySelector('.text-question-field') as HTMLInputElement;
        field.value = 'correct';
        field.dispatchEvent(new InputEvent('input'));
        fixture.detectChanges();

        const button = element.querySelector('#grade-answers-btn') as HTMLButtonElement;
        button.click();

        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const feedbacks = element.querySelectorAll('.answer-feedback');
          expect(feedbacks.length).toBe(1);
        });
       
        const request = httpTestController.expectOne(api.endpoints.answers.correctAnswersFull(1) + '?version=1');
        request.flush([
          {
            id: '1',
            answers: [
              {
                id: '1',
                value: 'correct',
              }
            ]
          }
        ] as IGradedAnswer[], {
          status: HttpStatusCode.Ok,
          statusText: 'Ok',
        });
      }));

      it('Does not render in instant mode', () => {
        component.instantMode = true;
        component.quizId = 1;
        component.questions = [
          {
            prompt: 'question #1',
            id: '1',
            type: shortQuestionTypes[questionTypes.text],
            notes: '',
          }
        ];

        component.ngOnInit();
        fixture.detectChanges();

        const button = element.querySelector('#grade-answers-btn');
        expect(button).toBeNull();
      });
    });

    afterEach(() => {
      httpTestController.verify();
    });
  });
});
