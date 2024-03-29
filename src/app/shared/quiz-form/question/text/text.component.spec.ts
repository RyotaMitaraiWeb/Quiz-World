import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TextComponent } from './text.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { questionTypes } from '../../../../constants/question-types.constants';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
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
              value: ['', Validators.required, Validators.maxLength(100)],
              correct: [true],
            })
          ]),
          type: [questionTypes.text],
        }
      )]
    ),
    instantMode: [false, [Validators.required]],
  });

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TextComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(TextComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      form = fb.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.maxLength(300)]],
        questions: fb.array(
          [fb.group(
            {
              prompt: ['', [Validators.required, Validators.maxLength(100)]],
              answers: fb.array([
                fb.group({
                  value: ['', Validators.required, Validators.maxLength(100)],
                  correct: [true],
                })
              ]),
              type: [questionTypes.text],
            }
          )]
        ),
        instantMode: [false, [Validators.required]],
      });
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    
  });

  describe('Component tests', () => {
    let questionEl: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TextComponent, NoopAnimationsModule]
      }).compileComponents();

      fixture = TestBed.createComponent(TextComponent);
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
                  value: ['', Validators.required, Validators.maxLength(100)],
                  correct: [true],
                })
              ]),
              type: [questionTypes.text],
            }
          )]
        ),
        instantMode: [false, [Validators.required]],
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

          const addBtn = questionEl.querySelector('.add-field-btn') as HTMLElement;
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

          const addBtn = questionEl.querySelector('.add-field-btn') as HTMLButtonElement;
          addBtn.click();

          fixture.detectChanges();

          const secondField = questionEl.querySelectorAll('.correct-answer-field')[1] as HTMLInputElement;

          secondField.value = 'a';

          fixture.detectChanges();

          const removeBtn = questionEl.querySelector('.remove-field-btn') as HTMLButtonElement;
          removeBtn.click();

          fixture.detectChanges();

          const remainingField = questionEl.querySelector('.correct-answer-field') as HTMLInputElement;
          expect(remainingField.value).toBe('a');
        });
      });
    });
  });
});
