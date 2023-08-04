import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MultipleChoiceComponent } from './multiple-choice.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { questionTypes } from '../../../../constants/question-types.constants';

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;
  let loader: HarnessLoader;

  const event = new Event('click');

  const fb = new FormBuilder();

  let form = fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(300)]],
    questions: fb.array(
      [fb.group(
        {
          prompt: ['', [Validators.required, Validators.maxLength(100)]],
          answers: fb.array([
            fb.group({
              value: ['', [Validators.required, Validators.maxLength(100)]],
              correct: [true],
            }),
            fb.group({
              value: ['', [Validators.required, Validators.maxLength(100)]],
              correct: [false],
            })
          ]),

          type: [questionTypes.multi],
        }
      )]
    ),
    instantMode: [false, [Validators.required]],
  });

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultipleChoiceComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(MultipleChoiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Component tests', () => {
    let questionEl: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultipleChoiceComponent, NoopAnimationsModule]
      }).compileComponents();

      fixture = TestBed.createComponent(MultipleChoiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      questionEl = fixture.debugElement.nativeElement;
      loader = TestbedHarnessEnvironment.loader(fixture);
      form = fb.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.maxLength(300)]],
        questions: fb.array(
          [fb.group(
            {
              prompt: ['', [Validators.required, Validators.maxLength(100)]],
              answers: fb.array([
                fb.group({
                  value: ['', [Validators.required, Validators.maxLength(100)]],
                  correct: [true],
                }),
                fb.group({
                  value: ['', [Validators.required, Validators.maxLength(100)]],
                  correct: [false],
                })
              ]),

              type: [questionTypes.multi],
            }
          )]
        ),
        instantMode: [false, [Validators.required]],
      });
    });

    describe('Data populating', () => {
      it('Renders a passed form properly', async () => {
        form.controls.questions.controls[0].controls.answers.push(
          fb.group({ value: ['correct'], correct: [true]})
        );

        form.controls.questions.controls[0].controls.answers.push(
          fb.group({ value: ['wrong'], correct: [true] })
        );

        component.form = form.controls.questions.controls[0];
        component.ngOnInit();
        fixture.detectChanges();

        const fields = await loader.getAllHarnesses(MatInputHarness);
        expect(fields.length).toBe(5);
        
        expect(await fields[2].getValue()).toBe('correct');
        expect(await fields[3].getValue()).toBe('wrong');
      });
    });

    describe('Validation and inputting', () => {
      describe('Prompt', () => {
        it('Displays validation error if left empty', () => {
          component.ngOnInit();
          fixture.detectChanges();

          component.form.get('prompt')?.markAsTouched();
          fixture.detectChanges();

          const matErrors = document.querySelectorAll('mat-error');
          expect(matErrors.length).toBe(1);

          expect(matErrors[0].textContent).toBe('Please fill this field!');
        });
      });
    });

    describe('Adding and removing fields', () => {
      let questionEl: HTMLElement;

      beforeEach(() => {
        const questionDe = fixture.debugElement;
        questionEl = questionDe.nativeElement as HTMLElement;
      });

      describe('Correct answer fields', () => {
        it('Adds a new field successfully', () => {
          component.ngOnInit();
          fixture.detectChanges();

          const addBtn = questionEl.querySelector('.add-field-btn.correct') as HTMLElement;
          addBtn.click();

          fixture.detectChanges();

          const fields = questionEl.querySelectorAll('.correct-answer-field') as NodeListOf<HTMLInputElement>;
          expect(fields.length).toBe(2);

          const field = fields[1];
          expect(field.value).toBe('');
        });

        it('Removes a field successfully', () => {
          component.ngOnInit();
          fixture.detectChanges();

          const addBtn = questionEl.querySelector('.add-field-btn.correct') as HTMLButtonElement;
          addBtn.click();

          fixture.detectChanges();

          const secondField = questionEl.querySelectorAll('.correct-answer-field')[1] as HTMLInputElement;

          secondField.value = 'a';

          fixture.detectChanges();

          const removeBtn = questionEl.querySelector('.remove-field-btn.correct') as HTMLButtonElement;
          removeBtn.click();

          fixture.detectChanges();

          const remainingField = questionEl.querySelector('.correct-answer-field') as HTMLInputElement;
          expect(remainingField.value).toBe('a');

        });
      });

      describe('Wrong answer fields', () => {
        it('Adds a new field successfully', () => {
          component.ngOnInit();
          fixture.detectChanges();

          const addBtn = questionEl.querySelector('.add-field-btn.wrong') as HTMLElement;
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

          const addBtn = questionEl.querySelector('.add-field-btn.wrong') as HTMLButtonElement;
          addBtn.click();

          fixture.detectChanges();

          const secondField = questionEl.querySelectorAll('.wrong-answer-field')[1] as HTMLInputElement;

          secondField.value = 'a';

          fixture.detectChanges();

          const removeBtn = questionEl.querySelector('.remove-field-btn.wrong') as HTMLButtonElement;
          removeBtn.click();

          fixture.detectChanges();

          const remainingField = questionEl.querySelector('.wrong-answer-field') as HTMLInputElement;
          expect(remainingField.value).toBe('a');

        });
      });
    });
  });
});
