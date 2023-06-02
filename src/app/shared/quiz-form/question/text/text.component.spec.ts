import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TextComponent } from './text.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray } from '@angular/forms';

describe('MultipleChoiceComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let loader: HarnessLoader;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TextComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(TextComponent);
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
        imports: [TextComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(TextComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('hasMoreThanOneCorrectAnswerField getter', () => {
      it('Returns true if the form has more than one correct answer', () => {
        component.answers = [
          {
            value: 'a',
            correct: true,
          },
          {
            value: 'a',
            correct: true,
          },
        ];

        component.ngOnInit();

        const result = component.hasMoreThanOneCorrectAnswerField;
        expect(result).toBe(true);
      });

      it('Returns false if the form has exactly one correct answer', () => {
        component.answers = [

          {
            value: 'a',
            correct: true,
          },
        ];

        component.ngOnInit();

        const result = component.hasMoreThanOneCorrectAnswerField;
        expect(result).toBe(false);
      });
    });

    describe('addNewCorrectAnswerField', () => {
      it('Adds a new field to the form', () => {
        component.ngOnInit();

        component.addNewCorrectAnswerField();
        const form = component.form.get('correctAnswers') as FormArray;
        expect(form.controls.length).toBe(2);

        expect(form.controls[1].value).toEqual({ correctAnswer: ''});
      });
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
    });

    describe('Data populating', () => {
      it('Renders input properties correctly', async () => {
        component.prompt = 'Random Question';
        component.answers = [
          {
            value: 'Correct answer',
            correct: true,
          },
          {
            value: 'Correct answer2',
            correct: true,
          },
        ];

        component.ngOnInit();

        fixture.detectChanges();

        const fields = await loader.getAllHarnesses(MatInputHarness);
        
        expect(fields.length).toBe(3);

        expect(await fields[0].getValue()).toBe('Random Question');
        expect(await fields[1].getValue()).toBe('Correct answer');
        expect(await fields[2].getValue()).toBe('Correct answer2');

        const correctFields = questionEl.querySelectorAll('.correct-answer-field');
        expect(correctFields.length).toBe(2);
      });

      it('Renders input properly if no props are passed', async () => {
        component.ngOnInit();
        fixture.detectChanges();

        const fields = await loader.getAllHarnesses(MatInputHarness);
        expect(fields.length).toBe(2);

        expect(await fields[0].getValue()).toBe('');
        expect(await fields[1].getValue()).toBe('');
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
    });
  });
});
