import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestionComponent } from './multiple-choice-question.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

describe('MultipleChoiceQuestionComponent', () => {
  function setAnswers(...args: string[] | number[]) {
    component.form.controls.currentAnswer.clear();
    args.forEach(a => {
      component.form.controls.currentAnswer.push(fb.control(a.toString()));
    });
  }

  let component: MultipleChoiceQuestionComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionComponent>;
  let element: HTMLElement;
  const fb = new FormBuilder();

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          MultipleChoiceQuestionComponent,
          ReactiveFormsModule,
          MatCheckboxModule,
          MatRadioModule
        ],
      });
      fixture = TestBed.createComponent(MultipleChoiceQuestionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('isCorrect getter', () => {
      it('Returns null if correctAnswers is null', () => {
        component.correctAnswers = null;
        const result = component.isCorrect;
        expect(result).toBeNull();
      });

      it('Returns false if the correct and current answers are of different lengths', () => {
        setAnswers(1, 2, 3, 4);
        
        component.correctAnswers = [
          { id: 1, value: 'a' }, { id: 2, value: 'b' },
          { id: 3, value: 'c' },
        ];

        const result = component.isCorrect;
        expect(result).toBeFalse();

        setAnswers(3, 1);
        const result2 = component.isCorrect;
        expect(result2).toBeFalse();

        setAnswers(1, 2, 3, 4);
        const result3 = component.isCorrect;
        expect(result3).toBeFalse();
      });

      it('Returns false if the correct and current answers do not match', () => {
        setAnswers(2, 1, 4);
        component.correctAnswers = [
          { id: 1, value: 'a' }, { id: 2, value: 'b' },
          { id: 3, value: 'c' },
        ];

        const result = component.isCorrect;
        expect(result).toBeFalse();
      });

      it('Returns true if the correct and current answers match', () => {
        setAnswers(2, 1, 3);
        component.correctAnswers = [
          { id: 1, value: 'a' }, { id: 2, value: 'b' },
          { id: 3, value: 'c' },
        ];

        const result = component.isCorrect;
        expect(result).toBeTrue();

        setAnswers(3, 2, 1);
        expect(component.isCorrect).toBeTrue();
      });
    });

    describe('answerClass', () => {
      it('Returns correct name for an ungraded question', () => {
        component.correctAnswers = null;
        const result = component.answerClass(0);

        expect(result).toBe('not-graded');
      });

      it('Returns correct name for a correct answer', () => {
        component.correctAnswers = [{ value: 'correct', id: 1 }, { value: 'correct2', id: 2 }];

        const result = component.answerClass(1);
        expect(result).toBe('correct-answer');

        const result2 = component.answerClass(2);
        expect(result2).toBe('correct-answer');
      });

      it('Returns correct name for a wrong answer', () => {
        component.correctAnswers = [{ value: 'correct', id: 1 }];

        const result = component.answerClass(2);
        expect(result).toBe('wrong-answer');
      });
    });

    describe('updateAnswers', () => {
      let event: MatCheckboxChange;
      beforeEach(() => {
        event = new MatCheckboxChange();

        // easier to do this than make a new instance of MatCheckbox
        event.source = {} as any;

      });

      it('Adds a value to the currentAnswers array if checked is true', () => {
        event.checked = true;
        event.source.value = '5';
        component.updateAnswers(event);

        expect(component.currentAnswers).toEqual(['5']);

        event.source.value = '12';
        component.updateAnswers(event);

        expect(component.currentAnswers).toEqual(['5', '12']);
      });

      it('Removes the given value from the currentAnswers array if checked is false', () => {
        event.checked = false;
        event.source.value = '1';
        setAnswers(1, 2, 3);
        component.updateAnswers(event);
        expect(component.currentAnswers).toEqual(['2', '3']);

        event.source.value = '3';

        component.updateAnswers(event);
        expect(component.currentAnswers).toEqual(['2']);
      });

      it('Throws an error if checked is false, but the answer is not in the currentAnswers array (and does not mutate the array)', () => {
        setAnswers(1, 2, 3);
        event.checked = false;
        event.source.value = '4';

        expect(() => component.updateAnswers(event)).toThrow();
        expect(component.currentAnswers).toEqual(['1', '2', '3']);
      });

      it('Removes the required error when checking an answer.', () => {
        const form = component.form.controls.currentAnswer;

        event.checked = true;
        event.source.value = '1';

        component.updateAnswers(event);
        expect(form.errors).toEqual(null);

        event.checked = false;
        component.updateAnswers(event);
        expect(form.errors).toEqual({ required: true });
      });
    });
  });

  describe('Component tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          MultipleChoiceQuestionComponent,
          ReactiveFormsModule,
          MatCheckboxModule,
          MatRadioModule
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(MultipleChoiceQuestionComponent);
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
            value: 'correct2',
          },
          {
            id: 3,
            value: 'wrong',
          },
        ];

        fixture.detectChanges();

        const answers = element.querySelectorAll('.not-graded');
        expect(answers.length).toBe(3);
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
            value: 'correct2',
          },
          {
            id: 3,
            value: 'wrong',
          },
        ];

        fixture.detectChanges();

        component.correctAnswers = [{ value: 'correct', id: 1 }, { value: 'correct2', id: 2 }];
        fixture.detectChanges();

        const correctAnswers = element.querySelectorAll('.correct-answer');
        expect(correctAnswers.length).toBe(2);

        const wrongAnswers = element.querySelectorAll('.wrong-answer');
        expect(wrongAnswers.length).toBe(1);
      });
    });

    describe('Answer feedbacks', () => {
      it('Displays no feedbacks if the question has not been graded', () => {
        component.correctAnswers = null;
        component.answers = component.answers = [
          {
            id: 1,
            value: 'correct',
          },
          {
            id: 2,
            value: 'correct2',
          },
          {
            id: 3,
            value: 'wrong',
          },
        ];

        fixture.detectChanges();

        const feedbacks = document.querySelectorAll('.answer-feedback');
        expect(feedbacks.length).toBe(0);
      });

      it('Displays correct feedback for a correct answer', () => {
        component.correctAnswers = [{ id: 1, value: 'correct' }, { id: 2, value: 'correct2' }];
        component.answers = [
          {
            id: 1,
            value: 'correct',
          },
          {
            id: 2,
            value: 'correct2',
          },
          {
            id: 3,
            value: 'wrong',
          },
        ];

        setAnswers(1, 2);

        component.form.controls.currentAnswer.setErrors(null);

        fixture.detectChanges();

        const feedbackCorrect = element.querySelector('.answer-feedback.correct');
        expect(feedbackCorrect).not.toBeNull();
      });

      it('Displays correct feedback for a wrong answer', () => {
        component.answers = [
          {
            id: 1,
            value: 'correct',
          },
          {
            id: 2,
            value: 'correct2',
          },
          {
            id: 3,
            value: 'wrong',
          },
        ];

        setAnswers(1, 2, 3);

        fixture.detectChanges();
        component.correctAnswers = [{ id: 1, value: 'correct' }, { id: 2, value: 'correct2' }];

        fixture.detectChanges();

        const feedbackCorrect = element.querySelector('.answer-feedback.wrong');
        expect(feedbackCorrect).not.toBeNull();

        setAnswers(1);

        fixture.detectChanges();

        expect(element.querySelector('.answer-feedback.wrong')).not.toBeNull();
      });
    });
  });
});
