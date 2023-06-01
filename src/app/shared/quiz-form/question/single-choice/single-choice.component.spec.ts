import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceComponent } from './single-choice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { IAnswer } from '../../../../../types/components/answer.types';

describe('SingleChoiceComponent', () => {
  let component: SingleChoiceComponent;
  let fixture: ComponentFixture<SingleChoiceComponent>;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SingleChoiceComponent, BrowserAnimationsModule]
      });
      fixture = TestBed.createComponent(SingleChoiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Integration tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SingleChoiceComponent, BrowserAnimationsModule]
      });
      fixture = TestBed.createComponent(SingleChoiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('ngOnInit implementation', () => {
      it('Sets form value successfully if @Input properties are passed', () => {
        component.prompt = 'a';
        component.answers = [
          {
            value: 'a',
            correct: true,
          },
          {
            value: 'a',
            correct: false,
          },
        ];

        component.ngOnInit();

        expect(component.form.value).toEqual(
          {
            prompt: 'a',
            correctAnswer: 'a',
            wrongAnswers: [{ wrongAnswer: 'a' }]
          }
        );
      });

      it('Sets form value successfully if no @Input properties are passed', () => {
        component.ngOnInit();

        expect(component.form.value).toEqual(
          {
            prompt: '',
            correctAnswer: '',
            wrongAnswers: [{ wrongAnswer: '' }]
          }
        );
      });
    });

    describe('hasMoreThanOneWrongAnswerField getter', () => {
      it('Returns true if the form has more than one wrong answer', () => {
        component.answers = [
          {
            value: 'a',
            correct: false,
          },
          {
            value: 'a',
            correct: false,
          },
        ];

        component.ngOnInit();

        const result = component.hasMoreThanOneWrongAnswerField;
        expect(result).toBe(true);
      });

      it('Returns false if the form has exactly one wrong answer', () => {
        component.answers = [

          {
            value: 'a',
            correct: false,
          },
        ];

        component.ngOnInit();

        const result = component.hasMoreThanOneWrongAnswerField;
        expect(result).toBe(false);
      });
    });

    describe('addNewWrongAnswerField', () => {
      it('Adds a new field to the form', () => {
        component.ngOnInit();

        component.addNewWrongAnswerField();
        const form = component.form.get('wrongAnswers') as FormArray;
        expect(form.controls.length).toBe(2);

        expect(form.controls[1].value).toEqual({ wrongAnswer: ''});
      });
    });

    describe('removeWrongAnswerFieldAt', () => {
      it('Removes field at the given index', () => {
        component.answers = [
          {
            value: 'a',
            correct: true,
          },
          {
            value: 'a',
            correct: false,
          },
          {
            value: 'a',
            correct: false,
          }
        ];

        component.ngOnInit();

        component.removeWrongAnswerFieldAt(0);
        const wrongAnswersForm = component.form.get('wrongAnswers') as FormArray;
        expect(wrongAnswersForm.length).toBe(1);

        expect(wrongAnswersForm.value).toEqual([{ wrongAnswer: 'a'}]);
      });

      it('Does nothing if there is only one fields', () => {
        component.answers = [
          {
            value: 'a',
            correct: true,
          },
          {
            value: 'a',
            correct: false,
          },
        ];

        component.ngOnInit();

        component.removeWrongAnswerFieldAt(0);
        const wrongAnswersForm = component.form.get('wrongAnswers') as FormArray;
        expect(wrongAnswersForm.length).toBe(1);
      });
    });
  });

  describe('Component tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SingleChoiceComponent, BrowserAnimationsModule, ReactiveFormsModule]
      }).compileComponents();
      fixture = TestBed.createComponent(SingleChoiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('Data populating', () => {
      it('Renders input properties correctly', () => {
        component.prompt = 'Random Question';
        component.answers = [
          {
            value: 'Correct answer',
            correct: true,
          },
          {
            value: 'Wrong answer',
            correct: false,
          },
          {
            value: 'Wrong answer2',
            correct: false,
          },
        ];

        component.ngOnInit();

        fixture.detectChanges();

        const questionDe = fixture.debugElement;
        const questionEl = questionDe.nativeElement as HTMLElement;

        const prompt = questionEl.querySelector('.prompt') as HTMLInputElement;
        expect(prompt.value).toBe('Random Question');

        const correctAnswer = questionEl.querySelector('.correct-answer-field') as HTMLInputElement;
        expect(correctAnswer.value).toBe('Correct answer');

        const wrongAnswers = questionEl.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;

        expect(wrongAnswers.length).toBe(2);
        expect(wrongAnswers[0].value).toBe('Wrong answer');
        expect(wrongAnswers[1].value).toBe('Wrong answer2');
      });

      it('Renders properly if no props are passed to it', () => {
        component.ngOnInit();

        fixture.detectChanges();

        const questionDe = fixture.debugElement;
        const questionEl = questionDe.nativeElement as HTMLElement;

        const prompt = questionEl.querySelector('.prompt') as HTMLInputElement;
        expect(prompt.value).toBe('');

        const correctAnswer = questionEl.querySelector('.correct-answer-field') as HTMLInputElement;
        expect(correctAnswer.value).toBe('');

        const wrongAnswers = questionEl.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
        expect(wrongAnswers.length).toBe(1);
        expect(wrongAnswers[0].value).toBe('');
      });
    });

    describe('Input and validation', () => {
      let questionEl: HTMLElement;

      let promptField: HTMLInputElement;
      let correctAnswerField: HTMLInputElement;
      beforeEach(() => {
        const questionDe = fixture.debugElement;
        questionEl = questionDe.nativeElement as HTMLElement;

        promptField = questionEl.querySelector('.prompt') as HTMLInputElement;
        correctAnswerField = questionEl.querySelector('.correct-answer-field') as HTMLInputElement;
      });

      describe('Prompt', () => {
        it('Displays validation error for a missing prompt', () => {
          component.ngOnInit();
          fixture.detectChanges();

          component.form.get('prompt')?.markAsTouched();
          fixture.detectChanges();

          const matErrors = questionEl.querySelectorAll('mat-error');
          expect(matErrors.length).toBe(1);
          expect(matErrors[0].textContent).toBe('Please fill this field!')
        });

        it('Displays validation error for a prompt that is too long', () => {
          component.ngOnInit();
          fixture.detectChanges();

          component.form.get('prompt')?.setValue('a'.repeat(500));
          component.form.get('prompt')?.markAsTouched();
          fixture.detectChanges();

          const matErrors = questionEl.querySelectorAll('mat-error');
          expect(matErrors.length).toBe(1);

          expect(matErrors[0].textContent).toBe('This field is too long!');
        });
      });
    });

    describe('Adding and removing fields', () => {
      let questionEl: HTMLElement;

      beforeEach(() => {
        const questionDe = fixture.debugElement;
        questionEl = questionDe.nativeElement as HTMLElement;
      });

      it('Adds a new field successfully', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const addBtn = questionEl.querySelector('.add-field-btn') as HTMLElement;
        addBtn.click();

        fixture.detectChanges();

        const fields = questionEl.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
        expect(fields.length).toBe(2);

        const field = fields[1];
        expect(field.value).toBe('');
      });

      it('Removes a field successfully', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const addBtn = questionEl.querySelector('.add-field-btn') as HTMLButtonElement;
        addBtn.click();

        fixture.detectChanges();

        const secondField = questionEl.querySelectorAll('.wrong-answer-field')[1] as HTMLInputElement;

        secondField.value = 'a';

        fixture.detectChanges();

        const removeBtn = questionEl.querySelector('.remove-field-btn') as HTMLButtonElement;
        removeBtn.click();

        fixture.detectChanges();

        const remainingField = questionEl.querySelector('.wrong-answer-field') as HTMLInputElement;
        expect(remainingField.value).toBe('a');

      });
    });
  });
});
