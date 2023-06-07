import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

import { QuestionComponent } from './question.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let loader: HarnessLoader;
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
        imports: [QuestionComponent, BrowserAnimationsModule]
      });
      fixture = TestBed.createComponent(QuestionComponent);
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

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('onChangeQuestionType', () => {
      describe('passing "multi"', () => {
        it('enables the wrongAnswers control', () => {
          component.form.controls.wrongAnswers.disable();
          component.onChangeQuestionType('multi');
          expect(component.form.controls.wrongAnswers.disabled).toBeFalse();
        });
      });

      describe('passing "text"', () => {
        it('Restarts the wrongAnswers control', () => {
          component.form.controls.wrongAnswers.push(new FormGroup({ answer: new FormControl('aewwew')}))
          component.onChangeQuestionType('text');
          
          expect(component.form.controls.wrongAnswers.length).toBe(0);
        });
      });

      describe('passing "single"', () => {
        it('Passes only the first correct answer', () => {
          component.form.controls.correctAnswers.push(new FormGroup({ answer: new FormControl('aewwew')}));
          component.onChangeQuestionType('single');
          expect(component.form.controls.correctAnswers.length).toBe(1);
        });

        it('Enables the wrongAnswers control', () => {
          component.form.controls.wrongAnswers.disable();
          component.onChangeQuestionType('single');
          expect(component.form.controls.wrongAnswers.disabled).toBeFalse();
        });
      });
    });
  });

  describe('Component tests', () => {
    let questionEl: HTMLElement;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuestionComponent, BrowserAnimationsModule],
      }).compileComponents();
      fixture = TestBed.createComponent(QuestionComponent);
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
              correctAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
              wrongAnswers: fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]),
              type: ['single'],
            }
          )]
        ),
        instantMode: [false, [Validators.required]],
      });
    });

    it('Generates correct heading based on index', () => {
      component.index = 2;
      fixture.detectChanges();

      const questionIndex = questionEl.querySelector('.question-index');

      expect(questionIndex?.textContent).toBe('Question #3');
    });

    describe('Generating question type', () => {
      it('Successfully generates a question based on form input', async () => {
        const questionForm = form.controls.questions.controls[0];
        questionForm.controls.type.setValue('multi');

        component.form = questionForm;
        component.ngOnInit();
        fixture.detectChanges();

        const select = await loader.getHarness(MatSelectHarness);
        const selectValue = await select.getValueText();
        
        expect(selectValue).toBe('Multiple-choice');

        const questionType = questionEl.querySelector('.question-type');        
        expect(questionType?.textContent).toBe('Multiple-choice question');
      });

      it('Changes question type via the select menu', async () => {
        const select = await loader.getHarness(MatSelectHarness);
        await select.open();

        const options = await select.getOptions();
        await options[1].click();

        const multi = questionEl.querySelector('.multiple-choice-question');
        expect(multi).not.toBe(null);

        const single = questionEl.querySelector('.single-choice-question');
        expect(single).toBe(null);
      });

      it('Memorizes prompt', async () => {
        const promptField = (await loader.getAllHarnesses(MatInputHarness))[0];
        promptField.setValue('random')
        fixture.detectChanges();

        const select = await loader.getHarness(MatSelectHarness);
        await select.open();

        const options = await select.getOptions();
        await options[1].click();

        fixture.detectChanges();

        const multipleChoiceQuestion = questionEl.querySelector('.multiple-choice-question');
        expect(multipleChoiceQuestion).not.toBeNull();

        const newPromptField = multipleChoiceQuestion?.querySelector('.prompt') as HTMLInputElement;
        expect(newPromptField.value).toBe('random');
      });
    });

    describe('Transfering answers from one type to another', () => {
      let select: MatSelectHarness;
      beforeEach(async () => {
        select = await loader.getHarness(MatSelectHarness);
      });

      describe('to single-choice questions', () => {
        it('transfers from multiple-choice questions', async () => {
          await select.open();
          fixture.detectChanges();

          const options = await select.getOptions();
          await options[1].click();

          fixture.detectChanges();

          const fields = await loader.getAllHarnesses(MatInputHarness);

          await fields[1].setValue('correct');
          await fields[2].setValue('incorrect');

          fixture.detectChanges();

          const addNewCorrectAnswerFieldBtn = document.querySelector('.add-field-btn.correct') as HTMLButtonElement;
          const addNewWrongAnswerFieldBtn = document.querySelector('.add-field-btn.wrong') as HTMLButtonElement;

          addNewCorrectAnswerFieldBtn.click();
          addNewWrongAnswerFieldBtn.click();

          fixture.detectChanges();

          const updatedFields = await loader.getAllHarnesses(MatInputHarness);
          await updatedFields[2].setValue('right');
          await updatedFields[4].setValue('wrong');

          fixture.detectChanges();

          await select.open();
          fixture.detectChanges();
          await options[0].click();
          fixture.detectChanges();


          const correctAnswerFields = document.querySelectorAll('.correct-answer-field') as NodeListOf<HTMLInputElement>;
          expect(correctAnswerFields.length).toBe(1);

          expect(correctAnswerFields[0].value).toBe('correct');

          const wrongAnswerFields = document.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
          expect(wrongAnswerFields.length).toBe(2);

          expect(wrongAnswerFields[0].value).toBe('incorrect');
          expect(wrongAnswerFields[1].value).toBe('wrong');
        });

        it('transfers from text questions', async () => {
          await select.open();
          fixture.detectChanges();

          const options = await select.getOptions();
          await options[2].click();

          fixture.detectChanges();

          const fields = await loader.getAllHarnesses(MatInputHarness);

          await fields[1].setValue('correct');
          fixture.detectChanges();

          const addNewCorrectAnswerFieldBtn = document.querySelector('.add-field-btn.correct') as HTMLButtonElement;
          addNewCorrectAnswerFieldBtn.click();

          fixture.detectChanges();

          const updatedFields = await loader.getAllHarnesses(MatInputHarness);
          await updatedFields[2].setValue('right');

          fixture.detectChanges();

          await select.open();
          fixture.detectChanges();

          await options[0].click();
          fixture.detectChanges();

          const correctAnswerFields = document.querySelectorAll('.correct-answer-field') as NodeListOf<HTMLInputElement>;
          expect(correctAnswerFields.length).toBe(1);

          expect(correctAnswerFields[0].value).toBe('correct');

          const wrongAnswerFields = document.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
          expect(wrongAnswerFields.length).toBe(1);
          expect(wrongAnswerFields[0].value).toBe('');
        });
      });

      describe('to multiple-choice questions', () => {
        it('transfers from single-choice question successfully', async () => {
          await select.open();
          fixture.detectChanges();

          const options = await select.getOptions();
          await options[0].click();

          fixture.detectChanges();

          const fields = await loader.getAllHarnesses(MatInputHarness);

          await fields[1].setValue('correct');

          fixture.detectChanges();

          await fields[2].setValue('wrong');

          fixture.detectChanges();

          const addFieldBtn = document.querySelector('.add-field-btn') as HTMLButtonElement;
          addFieldBtn.click();

          fixture.detectChanges();

          await select.open();
          await options[1].click();

          fixture.detectChanges();

          const correctAnswerFields = document.querySelectorAll('.correct-answer-field') as NodeListOf<HTMLInputElement>;
          expect(correctAnswerFields.length).toBe(1);

          expect(correctAnswerFields[0].value).toBe('correct')

          const wrongAnswerFields = document.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
          expect(wrongAnswerFields.length).toBe(2);
          expect(wrongAnswerFields[0].value).toBe('wrong');
          expect(wrongAnswerFields[1].value).toBe('');
        });

        it('transfers from text question successfully', async () => {
          await select.open();
          fixture.detectChanges();

          const options = await select.getOptions();
          await options[2].click();

          fixture.detectChanges();

          const fields = await loader.getAllHarnesses(MatInputHarness);

          await fields[1].setValue('correct');

          fixture.detectChanges();

          const addFieldBtn = document.querySelector('.add-field-btn') as HTMLButtonElement;
          addFieldBtn.click();

          fixture.detectChanges();

          const newField = (await loader.getAllHarnesses(MatInputHarness))[2];
          await newField.setValue('right');
          fixture.detectChanges();

          await select.open();
          fixture.detectChanges();

          await options[1].click();

          fixture.detectChanges();

          const correctAnswerFields = document.querySelectorAll('.correct-answer-field') as NodeListOf<HTMLInputElement>;
          expect(correctAnswerFields.length).toBe(2);

          expect(correctAnswerFields[0].value).toBe('correct');
          expect(correctAnswerFields[1].value).toBe('right');

          const wrongAnswerFields = document.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
          expect(wrongAnswerFields.length).toBe(1);
          expect(wrongAnswerFields[0].value).toBe('');
        });
      });

      describe('to text questions', () => {
        it('transfers from single-choice questions successfully', async () => {
          await select.open();
          fixture.detectChanges();

          const options = await select.getOptions();
          await options[0].click();

          fixture.detectChanges();

          const fields = await loader.getAllHarnesses(MatInputHarness);

          await fields[1].setValue('correct');

          fixture.detectChanges();

          await fields[2].setValue('wrong');

          fixture.detectChanges();

          const addFieldBtn = document.querySelector('.add-field-btn') as HTMLButtonElement;
          addFieldBtn.click();

          fixture.detectChanges();

          await select.open();
          await options[2].click();

          fixture.detectChanges();

          const correctAnswerFields = document.querySelectorAll('.correct-answer-field') as NodeListOf<HTMLInputElement>;
          expect(correctAnswerFields.length).toBe(1);

          expect(correctAnswerFields[0].value).toBe('correct')

          const wrongAnswerFields = document.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
          expect(wrongAnswerFields.length).toBe(0);
        });

        it('transfers from multiple-choice questions', async () => {
          await select.open();
          fixture.detectChanges();

          const options = await select.getOptions();
          await options[1].click();

          fixture.detectChanges();

          const fields = await loader.getAllHarnesses(MatInputHarness);

          await fields[1].setValue('correct');
          await fields[2].setValue('incorrect');

          fixture.detectChanges();

          const addNewCorrectAnswerFieldBtn = document.querySelector('.add-field-btn.correct') as HTMLButtonElement;
          const addNewWrongAnswerFieldBtn = document.querySelector('.add-field-btn.wrong') as HTMLButtonElement;

          addNewCorrectAnswerFieldBtn.click();
          addNewWrongAnswerFieldBtn.click();

          fixture.detectChanges();

          const updatedFields = await loader.getAllHarnesses(MatInputHarness);
          await updatedFields[2].setValue('right');
          await updatedFields[4].setValue('wrong');

          fixture.detectChanges();

          await select.open();
          fixture.detectChanges();
          await options[2].click();
          fixture.detectChanges();


          const correctAnswerFields = document.querySelectorAll('.correct-answer-field') as NodeListOf<HTMLInputElement>;
          expect(correctAnswerFields.length).toBe(2);

          expect(correctAnswerFields[0].value).toBe('correct');
          expect(correctAnswerFields[1].value).toBe('right');

          const wrongAnswerFields = document.querySelectorAll('.wrong-answer-field') as NodeListOf<HTMLInputElement>;
          expect(wrongAnswerFields.length).toBe(0);
        });
      });
    });
  });
});
