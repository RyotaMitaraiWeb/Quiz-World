import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceComponent } from './single-choice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { questionTypes } from '../../../../constants/question-types.constants';

describe('SingleChoiceComponent', () => {
  let component: SingleChoiceComponent;
  let fixture: ComponentFixture<SingleChoiceComponent>;
  const event = new Event('click');

  const fb = new FormBuilder();

  let form = fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(300)]],
    questions: fb.array(
      [fb.group({
        prompt: ['', [Validators.required, Validators.maxLength(100)]],
        answers: fb.array([
          fb.group(
            {
              value: ['', [Validators.required, Validators.maxLength(100)]],
              correct: [true],
            }
          ),
          fb.group(
            {
              value: ['', [Validators.required, Validators.maxLength(100)]],
              correct: [false],
            }
          )
        ]),
        type: [questionTypes.single],
        notes: [''],
      })]
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
          [fb.group({
            prompt: ['', [Validators.required, Validators.maxLength(100)]],
            answers: fb.array([
              fb.group(
                {
                  value: ['', [Validators.required, Validators.maxLength(100)]],
                  correct: [true],
                }
              ),
              fb.group(
                {
                  value: ['', [Validators.required, Validators.maxLength(100)]],
                  correct: [false],
                }
              )
            ]),
            type: [questionTypes.single],
            notes: [''],
          })]
        ),
        instantMode: [false, [Validators.required]],
      });
    });

    describe('Data populating', () => {
      it('Renders a passed form properly', () => {
        form.controls.questions.controls[0].controls.answers.controls[0].setValue({ value: 'correct', correct: true });
        form.controls.questions.controls[0].controls.answers.push(fb.group({ value: ['wrong'], correct: [false]}));
        form.controls.questions.controls[0].controls.answers.push(fb.group({ value: ['wrong2'], correct: [false]}));        form.controls.questions.controls[0].controls.type.setValue(questionTypes.single);

        component.form = form.controls.questions.controls[0];
        component.ngOnInit();

        fixture.detectChanges();

        const questionDe = fixture.debugElement;
        const questionEl = questionDe.nativeElement as HTMLElement;

        const prompt = questionEl.querySelector('.prompt') as HTMLTextAreaElement;
        expect(prompt.value).toBe('');

        const correctAnswer = questionEl.querySelector('.correct-answer-field') as HTMLTextAreaElement;
        
        expect(correctAnswer.value).toBe('correct');

        const wrongAnswers = questionEl.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLTextAreaElement>;
        
        expect(wrongAnswers.length).toBe(3);
        expect(wrongAnswers[1].value).toBe('wrong');
        expect(wrongAnswers[2].value).toBe('wrong2');
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

        const secondField = questionEl.querySelectorAll('.wrong-answer-field')[1] as HTMLTextAreaElement;

        secondField.value = 'a';

        fixture.detectChanges();
                
        const removeBtn = questionEl.querySelector('.remove-field-btn.visible') as HTMLButtonElement;
        removeBtn.click();

        fixture.detectChanges();
        

        const remainingField = questionEl.querySelector('.wrong-answer-field') as HTMLInputElement;
        expect(remainingField.value).toBe('a');

      });
    });
  });
});
