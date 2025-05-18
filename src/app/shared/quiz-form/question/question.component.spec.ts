import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

import { QuestionComponent } from './question.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { questionTypes } from '../../../constants/question-types.constants';

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

          type: [questionTypes.single],
          notes: ['']
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

              type: [questionTypes.single],
              notes: [''],
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
      describe('passing "text"', () => {
        it('Restarts the wrongAnswers control', () => {
          component.form.controls.answers.push(
            new FormGroup(
              {
                value: new FormControl('aewwew'),
                correct: new FormControl(false)
              }));

          component.onChangeQuestionType(questionTypes.text);

          expect(component.form.controls.answers.length).toBe(1);
        });
      });

      describe('passing "single"', () => {
        it('Passes only the first correct answer', () => {
          component.form.controls.answers.push(
            new FormGroup(
              { 
                value: new FormControl('aewwew'),
                correct: new FormControl(true)
              }
              ));
          component.onChangeQuestionType(questionTypes.single);
          expect(component.form.controls.answers.length).toBe(2);
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
    
              type: [questionTypes.single],
              notes: [''],
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
        questionForm.controls.type.setValue(questionTypes.multi);

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
  });
});
