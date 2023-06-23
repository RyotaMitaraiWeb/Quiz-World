import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQuestionComponent } from './text-question.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';

describe('TextQuestionComponent', () => {
  let component: TextQuestionComponent;
  let fixture: ComponentFixture<TextQuestionComponent>;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TextQuestionComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(TextQuestionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('isCorrect getter', () => {
      it('Returns null if the correctAnswers property is null', () => {
        component.correctAnswers = null;
        const result = component.isCorrect;
        expect(result).toBeNull();
      });

      it('Returns false if the correct answers property does not include the user\'s answer', () => {
        component.correctAnswers = [
          {
            id: 1,
            value: 'correct',
          }
        ];

        component.form.controls.currentAnswer.setValue('wrong');
        const result = component.isCorrect;
        expect(result).toBeFalse();
      });

      it('Returns true if the correct answers property includes the user\'s answer (case insensitive)', () => {
        component.correctAnswers = [
          {
            id: 1,
            value: 'correct',
          }
        ];

        component.form.controls.currentAnswer.setValue('cORRecT');
        const result = component.isCorrect;
        expect(result).toBeTrue();
      });
    });

    describe('ngOnChanges', () => {
      it('Sets the correctAnswers property to whatever changes have come', () => {
        const changes = new SimpleChange(null, [{ id: 1, value: 'correct' }], true);
        component.ngOnChanges({
          correctAnswers: changes,
        });

        expect(component.correctAnswers).toEqual([{ id: 1, value: 'correct' }]);
      });
    });
  });

  describe('Component tests', () => {
    let element: HTMLElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TextQuestionComponent, NoopAnimationsModule]
      }).compileComponents();
      fixture = TestBed.createComponent(TextQuestionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement;
    });

    describe('Prompt', () => {
      it('Correctly displays the prompt based on @Input', () => {
        component.prompt = 'question #2';
        fixture.detectChanges();

        const h1 = element.querySelector('h1');
        expect(h1?.textContent).toBe('question #2');
      });

      it('Prompt\'s class changes according to whether the user has answered correctly or wrongly or has not answered yet', () => {
        component.prompt = 'question #2';
        fixture.detectChanges();

        const unanswered = element.querySelector('h1.unanswered');
        expect(unanswered).not.toBeNull();

        component.correctAnswers = [{ value: 'correct', id: 1 }];
        component.form.controls.currentAnswer.setValue('wrong');
        fixture.detectChanges();

        const wrong = element.querySelector('h1.wrong');
        expect(wrong).not.toBeNull();

        component.form.controls.currentAnswer.setValue('correct');
        fixture.detectChanges();

        const correct = element.querySelector('h1.correct');
        expect(correct).not.toBeNull();
      });
    });

    describe('Answer feedbacks', () => {
      it('does not show feedbacks if the user has not answered yet', () => {
        component.correctAnswers = null;
        fixture.detectChanges();

        const feedbacks = document.querySelectorAll('.answer-feedback');
        expect(feedbacks.length).toBe(0);
      });

      it('Shows a feedback for correct answers', () => {
        component.correctAnswers = [
          {
            id: 1,
            value: 'correct',
          },
          {
            id: 2,
            value: 'right',
          },
        ];

        component.form.controls.currentAnswer.setValue('rIGht');
        fixture.detectChanges();

        const feedback = document.querySelector('.answer-feedback');
        expect(feedback?.textContent).toBe('Correct! The answers are: correct, right');
      });

      it('Shows a feedback for a wrong answer', () => {
        component.correctAnswers = [
          {
            id: 1,
            value: 'correct',
          },
          {
            id: 2,
            value: 'right',
          },
        ];

        component.form.controls.currentAnswer.setValue('wrong');
        fixture.detectChanges();

        const feedback = document.querySelector('.answer-feedback');
        expect(feedback?.textContent).toBe('Wrong! The answers are: correct, right');
      });
    });
  });
});
