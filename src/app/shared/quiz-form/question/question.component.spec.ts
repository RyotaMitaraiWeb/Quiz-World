import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

import { QuestionComponent } from './question.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let loader: HarnessLoader;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QuestionComponent, BrowserAnimationsModule]
      });
      fixture = TestBed.createComponent(QuestionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('onChangeQuestionType', () => {
      describe('passing "multi"', () => {
        it('appends an empty wrong answer field if the question did not have such at all', () => {
          component.question.answers = [{
            value: 'correct',
            correct: true,
          }];

          component.onChangeQuestionType('multi');

          expect(component.question.answers.length).toBe(2);
          expect(component.question.answers[1]).toEqual({
            value: '',
            correct: false,
          });
        });

        it('appends an empty correct answer field if the question did not have such at all', () => {
          component.question.answers = [{
            value: 'incorrect',
            correct: false,
          }];

          component.onChangeQuestionType('multi');

          expect(component.question.answers.length).toBe(2);
          expect(component.question.answers[1]).toEqual({
            value: '',
            correct: true,
          });
        });

        it('Does not append anything if there was at least one correct and one wrong answer', () => {
          component.question.answers = [
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'incorrect',
              correct: false,
            }
          ];

          component.onChangeQuestionType('multi');

          expect(component.question.answers).toEqual([
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'incorrect',
              correct: false,
            }
          ]);
        });
      });

      describe('passing "text"', () => {
        it('Removes any incorrect answers', () => {
          component.question.answers = [
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'incorrect',
              correct: false,
            }
          ];

          component.onChangeQuestionType('text');

          expect(component.question.answers).toEqual([
            {
              value: 'correct',
              correct: true,
            }
          ]);
        });

        it('Answers remain the same if they follow the format', () => {
          component.question.answers = [
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'correct2',
              correct: true,
            }
          ];

          component.onChangeQuestionType('text');

          expect(component.question.answers).toEqual([
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'correct2',
              correct: true,
            }
          ]);
        });
      });

      describe('passing "single"', () => {
        it('Passes only the first correct answer', () => {
          component.question.answers = [
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'correct2',
              correct: true,
            },
            {
              value: 'wrong',
              correct: false,
            }
          ];

          component.onChangeQuestionType('single');

          expect(component.question.answers).toEqual(
            [
              {
                value: 'correct',
                correct: true,
              },
              {
                value: 'wrong',
                correct: false,
              }
            ]
          )
        });

        it('Appends an empty wrong answer if there isn\'t a wrong answer', () => {
          component.question.answers = [
            {
              value: 'correct',
              correct: true,
            }
          ];

          component.onChangeQuestionType('single');

          expect(component.question.answers).toEqual([
            {
              value: 'correct',
              correct: true,
            }, {
              value: '',
              correct: false,
            }
          ]);
        });

        it('Works correctly if there are multiple correct answers and no wrong ones', () => {
          component.question.answers = [
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'correct2',
              correct: true,
            }
          ];

          component.onChangeQuestionType('single');
          expect(component.question.answers).toEqual([
            {
              value: 'correct',
              correct: true,
            }, {
              value: '',
              correct: false,
            }
          ]);

        });

        it('Answers remain the same if they satisfy the format', () => {
          component.question.answers = [
            {
              value: 'correct',
              correct: true,
            },
            {
              value: 'wrong',
              correct: false,
            },
            {
              value: 'wrong',
              correct: false,
            }
          ];

          component.onChangeQuestionType('single');

          expect(component.question.answers).toEqual(
            [
              {
                value: 'correct',
                correct: true,
              },
              {
                value: 'wrong',
                correct: false,
              },
              {
                value: 'wrong',
                correct: false,
              }
            ]
          );
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
    });

    it('Generates correct heading based on index', () => {
      component.index = 2;
      fixture.detectChanges();

      const questionIndex = questionEl.querySelector('.question-index');

      expect(questionIndex?.textContent).toBe('Question #2');
    });

    describe('Generating question type', () => {
      it('Successfully generates a question based on @Input type', async () => {
        component.type = 'multi';
        fixture.detectChanges();

        const select = await loader.getHarness(MatSelectHarness);
        const selectValue = await select.getValueText();
        expect(selectValue).toBe('Multiple-choice');

        const questionType = questionEl.querySelector('.question-type');
        expect(questionType?.textContent).toBe('Multiple-choice question');

        component.type = 'single';
        fixture.detectChanges();

        expect(questionType?.textContent).toBe('Single-choice question');
        expect(await select.getValueText()).toBe('Single-choice');
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

      it('Memorizes prompt if type is changed through the select menu', async () => {
        const promptField = questionEl.querySelector('.prompt') as HTMLInputElement;
        promptField.value = 'random';
        promptField.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const select = await loader.getHarness(MatSelectHarness);
        await select.open();

        const options = await select.getOptions();
        await options[1].click();

        fixture.detectChanges();

        const multipleChoiceQuestion = questionEl.querySelector('.multiple-choice-question');
        expect(multipleChoiceQuestion).not.toBeNull();
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
