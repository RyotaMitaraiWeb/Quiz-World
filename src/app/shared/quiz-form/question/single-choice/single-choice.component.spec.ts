import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceComponent } from './single-choice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

describe('SingleChoiceComponent', () => {
  let component: SingleChoiceComponent;
  let fixture: ComponentFixture<SingleChoiceComponent>;
  const event = new Event('click');

  const fb = new FormBuilder();

  let form = fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(300)]],
    questions: fb.array(
      [fb.group(
        {
          prompt: ['', [Validators.required, Validators.maxLength(100)]],
          correctAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          wrongAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
          type: ['single'],
        }
      )]
    ),
    instantMode: [false, [Validators.required]],
  });

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

    describe('addNewWrongAnswerField', () => {
      it('Adds a new field to the form', () => {
        component.ngOnInit();

        component.addNewWrongAnswerField(event);
        const form = component.form.get('wrongAnswers') as FormArray;
        expect(form.controls.length).toBe(2);

        expect(form.controls[1].value).toEqual({ answer: ''});
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

      form = fb.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.maxLength(300)]],
        questions: fb.array(
          [fb.group(
            {
              prompt: ['', [Validators.required, Validators.maxLength(100)]],
              correctAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
              wrongAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
              type: ['single'],
            }
          )]
        ),
        instantMode: [false, [Validators.required]],
      });
    });

    describe('Data populating', () => {
      it('Renders a passed form properly', () => {
        form.controls.questions.controls[0].controls.correctAnswers.push(fb.group({ answer: 'correct'}));
        form.controls.questions.controls[0].controls.wrongAnswers.setValue([{ answer: 'wrong1' }]);
        form.controls.questions.controls[0].controls.wrongAnswers.push(fb.group({ answer: 'wrong2'}));
        form.controls.questions.controls[0].controls.type.setValue('single');

        component.form = form.controls.questions.controls[0];
        component.ngOnInit();

        fixture.detectChanges();

        const questionDe = fixture.debugElement;
        const questionEl = questionDe.nativeElement as HTMLElement;

        const prompt = questionEl.querySelector('.prompt') as HTMLInputElement;
        expect(prompt.value).toBe('');

        const correctAnswer = questionEl.querySelector('.correct-answer-field') as HTMLInputElement;
        expect(correctAnswer.value).toBe('');

        const wrongAnswers = questionEl.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
        expect(wrongAnswers.length).toBe(2);
        expect(wrongAnswers[0].value).toBe('wrong1');
        expect(wrongAnswers[1].value).toBe('wrong2');
      });
    });

    describe('Input and validation', () => {
      let questionEl: HTMLElement;
      
      beforeEach(() => {
        const questionDe = fixture.debugElement;
        questionEl = questionDe.nativeElement as HTMLElement;
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
