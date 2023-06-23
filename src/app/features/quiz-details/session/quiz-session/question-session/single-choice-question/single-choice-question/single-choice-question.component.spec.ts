import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionComponent } from './single-choice-question.component';

describe('SingleChoiceQuestionComponent', () => {
  let component: SingleChoiceQuestionComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionComponent>;
  let element: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SingleChoiceQuestionComponent]
      });
      fixture = TestBed.createComponent(SingleChoiceQuestionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('isCorrect getter', () => {
      it('Returns null if correctAnswer is null', () => {
        component.correctAnswers = null;
        const result = component.isCorrect;
        expect(result).toBeNull();
      });

      it('Returns true if correctAnswer matches currentAnswer', () => {
        component.correctAnswers = [ { id: 1, value: 'correct '}];
        component.form.controls.currentAnswer.setValue(1);

        const result = component.isCorrect;
        expect(result).toBeTrue();
      });

      it('Returns false if currentAnswer does not match correctAnswer', () => {
        component.correctAnswers = [ { id: 1, value: 'correct' }];
        component.form.controls.currentAnswer.setValue(2);

        const result = component.isCorrect;
        expect(result).toBeFalse();
      });
    });

    describe('answerClass', () => {
      it('Returns correct name for an ungraded question', () => {
        component.correctAnswers = null;
        const result = component.answerClass(0);

        expect(result).toBe('not-graded');
      });

      it('Returns correct name for a correct answer', () => {
        component.correctAnswers = [ { value: 'correct', id: 1 }];
        component.form.controls.currentAnswer.setValue(1);

        const result = component.answerClass(1);
        expect(result).toBe('correct-answer');
      });

      it('Returns correct name for a wrong answer', () => {
        component.correctAnswers = [ { value: 'correct', id: 1 }];
        component.form.controls.currentAnswer.setValue(1);

        const result = component.answerClass(2);
        expect(result).toBe('wrong-answer');
      });
    });
  });

  describe('Component tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SingleChoiceQuestionComponent]
      }).compileComponents();
      fixture = TestBed.createComponent(SingleChoiceQuestionComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });

    describe('Answer rendering', () => {
      it('Renders ungraded answers correctly', () => {
        component.correctAnswers = null;
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
        const answers = element.querySelectorAll('.not-graded');
        expect(answers.length).toBe(2);
  
        const input1 = element.querySelector('input[value="1"]');
        expect(input1).not.toBeNull();
  
        const input2 = element.querySelector('input[value="2"]');
        expect(input2).not.toBeNull();
      });
  
      it('Correctly updates answers\'s status when the component is updated', () => {
        component.correctAnswers = null;
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
  
        component.correctAnswers = [{ value: 'correct', id: 1 }];
        fixture.detectChanges();
        
        const correctAnswers = element.querySelectorAll('.correct-answer');
        expect(correctAnswers.length).toBe(1);
  
        const wrongAnswers = element.querySelectorAll('.wrong-answer');
        expect(wrongAnswers.length).toBe(1);
      });
    });

    describe('Answer feedbacks', () => {
      it('Displays no feedbacks if the question has not been graded', () => {
        component.correctAnswers = null;
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

        const feedbacks = document.querySelectorAll('.answer-feedback');
        expect(feedbacks.length).toBe(0);
      });

      it('Displays correct feedback for a correct answer', () => {
        component.correctAnswers = [{ id: 1, value: 'correct' }];
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

        component.form.controls.currentAnswer.setValue(1);

        fixture.detectChanges();

        const feedbackCorrect = element.querySelector('.answer-feedback.correct');
        expect(feedbackCorrect).not.toBeNull();
      });

      it('Displays correct feedback for a wrong answer', () => {
        component.correctAnswers = [{ id: 1, value: 'correct' }];
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

        component.form.controls.currentAnswer.setValue(2);

        fixture.detectChanges();

        const feedbackCorrect = element.querySelector('.answer-feedback.wrong');
        expect(feedbackCorrect).not.toBeNull();
      });
    });
  });
});
