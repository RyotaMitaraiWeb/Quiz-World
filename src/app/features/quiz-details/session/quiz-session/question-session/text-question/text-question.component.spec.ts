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

        const prompt = element.querySelector('mat-card-title');
        expect(prompt?.textContent?.includes('question #2')).toBeTrue();
      });

      it('Prompt\'s class changes according to whether the user has answered correctly or wrongly or has not answered yet', () => {
        component.prompt = 'question #2';
        fixture.detectChanges();

        const unanswered = element.querySelector('.unanswered');
        expect(unanswered).not.toBeNull();

        component.correctAnswers = [{ value: 'correct', id: '1' }];
        component.form.controls.currentAnswer.setValue('wrong');
        fixture.detectChanges();

        const wrong = element.querySelector('.wrong');
        expect(wrong).not.toBeNull();

        component.form.controls.currentAnswer.setValue('correct');
        fixture.detectChanges();

        const correct = element.querySelector('.correct');
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
            id: '1',
            value: 'correct',
          },
          {
            id: '2',
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
            id: '1',
            value: 'correct',
          },
          {
            id: '2',
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
