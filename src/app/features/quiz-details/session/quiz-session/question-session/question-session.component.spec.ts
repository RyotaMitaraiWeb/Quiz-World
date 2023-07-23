import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionSessionComponent } from './question-session.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { api } from '../../../../../constants/api.constants';
import { ISessionAnswer } from '../../../../../../types/responses/quiz.types';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { AnswerService } from '../../../../answer-service/answer.service';
import { Observable } from 'rxjs';
import { questionTypes } from '../../../../../constants/question-types.constants';

describe('QuestionSessionComponent', () => {
  let component: QuestionSessionComponent;
  let fixture: ComponentFixture<QuestionSessionComponent>;
  let element: HTMLElement;
  let testController: HttpTestingController;
  const event = new Event('click');

  let answerService: AnswerService;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuestionSessionComponent, HttpClientTestingModule, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(QuestionSessionComponent);
      answerService = TestBed.inject(AnswerService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('gradeAnswer', () => {
      it('Sets correctAnswers property to the answer service\'s response in a successful operation', () => {
        spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
          new Observable(observer => {
            observer.next(
              new HttpResponse({
                status: HttpStatusCode.Ok,
                statusText: 'Ok',
                body: [
                  {
                    id: 1,
                    value: 'correct answer'
                  }
                ]
              })
            )
          })
        );

        component.type = questionTypes.single;
        component.instantMode = true;
        component.gradeAnswer(event);
        expect(component.correctAnswers).toEqual([
          {
            id: 1,
            value: 'correct answer',
          }
        ]);
      });

      it('Disables the form if the answer service\'s response is a successful operation', () => {
        spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
          new Observable(observer => {
            observer.next(
              new HttpResponse({
                status: HttpStatusCode.Ok,
                statusText: 'Ok',
                body: [
                  {
                    id: 1,
                    value: 'correct answer'
                  }
                ]
              })
            )
          })
        );

        component.type = questionTypes.single;
        component.instantMode = true;
        component.gradeAnswer(event);
        expect(component.form.disabled).toBeTrue();
      });

      it('Does nothing if not in instant mode', () => {
        component.type = questionTypes.single;
        component.instantMode = false;
        component.gradeAnswer(event);
        expect(component.correctAnswers).toBeNull();
        expect(component.form.disabled).toBeFalse();
      });

      it('Does nothing if form is disabled', () => {
        component.type = questionTypes.single;
        component.instantMode = true;
        component.form.disable();
        component.gradeAnswer(event);
        expect(component.correctAnswers).toBeNull();
      });

      it('Does not set the correctAnswers property to anything if the answer service returns a non-ok response', () => {
        spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
          new Observable(observer => {
            observer.error(
              new HttpResponse({
                status: HttpStatusCode.NotFound,
                statusText: 'Not Found',
                body: [
                  {
                    message: ['Error'],
                  }
                ]
              })
            )
          })
        );

        component.type = questionTypes.single;
        component.instantMode = true;
        component.gradeAnswer(event);
        expect(component.correctAnswers).toBeNull();
        expect(component.form.disabled).toBeFalse();
      });
    });
  });

  describe('Component tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuestionSessionComponent, HttpClientTestingModule, NoopAnimationsModule]
      }).compileComponents();
      fixture = TestBed.createComponent(QuestionSessionComponent);
      component = fixture.componentInstance;
      testController = TestBed.inject(HttpTestingController);

      fixture.detectChanges();
      element = fixture.debugElement.nativeElement as HTMLElement;
    });

    describe('Rendering', () => {
      it('Renders a text question successfully', () => {
        component.type = questionTypes.text;
        fixture.detectChanges();

        const textQuestion = element.querySelector('.text-question');
        expect(textQuestion).not.toBeNull();
      });

      it('Renders a single-choice question successfully', () => {
        component.type = questionTypes.single;
        fixture.detectChanges();
        component.answers = [
          {
            id: 1,
            value: 'correct',
          },
          {
            id: 2,
            value: 'wrong',
          },
        ];

        fixture.detectChanges();
        const question = element.querySelector('.single-choice-question');
        expect(question).not.toBeNull();
      });
    });

    describe('Grade button', () => {
      it('does not render if the mode is not instant', () => {
        component.instantMode = false;
        fixture.detectChanges();

        const button = element.querySelector('button');
        expect(button).toBeNull();
      });

      it('renders if the mode is instant', () => {
        component.instantMode = true;
        fixture.detectChanges();

        const button = element.querySelector('button');
        expect(button).not.toBeNull();
      });

      it('is disabled when the form is invalid', () => {
        component.instantMode = true;
        component.type = questionTypes.text;
        fixture.detectChanges();

        component.form.controls.currentAnswer.setValue('');
        component.form.controls.currentAnswer.markAsTouched();
        fixture.detectChanges();

        const button = element.querySelector('.grade-btn') as HTMLButtonElement;
        expect(button.disabled).toBeTrue();
      });

      it('is disabled when the form is disabled', () => {
        component.instantMode = true;
        component.type = questionTypes.text;
        component.form.controls.currentAnswer.setValue('valid');
        fixture.detectChanges();
        expect(component.form.valid).withContext('The form should be valid but is not').toBeTrue();
        component.form.controls.currentAnswer.markAsTouched();

        component.form.disable();
        fixture.detectChanges();

        const button = element.querySelector('.grade-btn') as HTMLButtonElement;
        expect(button.disabled).toBeTrue();
      });

      it('is enabled if the form is valid and not disabled', () => {
        component.instantMode = true;
        component.type = questionTypes.text;
        component.form.controls.currentAnswer.setValue('valid');
        fixture.detectChanges();
        expect(component.form.valid).withContext('The form should be valid but is not').toBeTrue();
        component.form.controls.currentAnswer.markAsTouched();
        fixture.detectChanges();

        const button = element.querySelector('.grade-btn') as HTMLButtonElement;
        expect(button.disabled).toBeFalse();
      });

      it('A successful request from clicking the button disables the button', () => {
        component.instantMode = true;
        component.type = questionTypes.text;
        component.form.controls.currentAnswer.setValue('valid');
        component.form.controls.id.setValue(1);
        fixture.detectChanges();
        expect(component.form.valid).withContext('The form should be valid but is not').toBeTrue();
        component.form.controls.currentAnswer.markAsTouched();
        fixture.detectChanges();

        const button = element.querySelector('.grade-btn') as HTMLButtonElement;
        button.click();
        fixture.detectChanges();

        const responseBody: ISessionAnswer[] = [
          {
            id: 1,
            value: 'correct',
          },
        ];

        const request = testController.expectOne(api.endpoints.answers.correctAnswersInstantMode(1));

        request.flush(responseBody, {
          status: HttpStatusCode.Ok,
          statusText: 'Ok',
        });

        fixture.detectChanges();
        expect(button.disabled).toBeTrue();
      });

      it('An unsuccessful request from clicking the button does NOT disable the button', () => {
        component.instantMode = true;
        component.type = questionTypes.text;
        component.form.controls.currentAnswer.setValue('valid');
        component.form.controls.id.setValue(1);
        fixture.detectChanges();
        expect(component.form.valid).withContext('The form should be valid but is not').toBeTrue();
        component.form.controls.currentAnswer.markAsTouched();
        fixture.detectChanges();

        const button = element.querySelector('.grade-btn') as HTMLButtonElement;
        button.click();
        fixture.detectChanges();

        const responseBody = [
          {
            message: ['Error']
          },
        ];

        const request = testController.expectOne(api.endpoints.answers.correctAnswersInstantMode(1));

        request.flush(responseBody, {
          status: HttpStatusCode.NotFound,
          statusText: 'Not Found',
        });

        fixture.detectChanges();
        expect(button.disabled).toBeFalse();
      });
    });
  });
});
