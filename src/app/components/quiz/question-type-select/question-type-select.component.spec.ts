import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { QuestionTypeSelectComponent } from './question-type-select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormGroup } from '@angular/forms';
import { QuestionForm } from '../types';
import { emptyAnswer, emptyMultipleChoiceQuestion, emptySingleChoiceQuestion, emptyTextQuestion } from '../emptyForms';
import { questionTypes } from '../../../common/questionTypes';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';

describe('QuestionTypeSelectComponent', () => {
  let component: QuestionTypeSelectComponent;
  let fixture: ComponentFixture<QuestionTypeSelectComponent>;
  let loader: HarnessLoader;
  let singleChoiceQuestion: FormGroup<QuestionForm>;
  let multipleChoiceQuestion: FormGroup<QuestionForm>;
  let textQuestion: FormGroup<QuestionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTypeSelectComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTypeSelectComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    singleChoiceQuestion = emptySingleChoiceQuestion();
    multipleChoiceQuestion = emptyMultipleChoiceQuestion();
    textQuestion = emptyTextQuestion();
  });

  it('should create', () => {
    fixture.componentRef.setInput('form', emptyTextQuestion());
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Correctly sets initial input', async () => {
    fixture.componentRef.setInput('form', emptyTextQuestion());
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    const value = await select.getValueText();
    expect(value).toBe(questionTypes.text);
  });

  describe('Changing to text', () => {
    it('Handles transition from multiple-choice to text question correctly', async () => {
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(true));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(true));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(true));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      fixture.componentRef.setInput('form', multipleChoiceQuestion);
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      const textOption = options[2];
      await textOption.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(multipleChoiceQuestion.controls.answers.length).toBe(4);
      expect(multipleChoiceQuestion.controls.answers.controls
          .filter(c => c.controls.correct.value)
          .length)
        .toBe(4);

      expect(multipleChoiceQuestion.controls.type.value).toBe(questionTypes.text);
    });

    it('Handles transition from single-choice to text question correctly', async () => {
      singleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      singleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      singleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      singleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      singleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      fixture.componentRef.setInput('form', singleChoiceQuestion);
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      const textOption = options[2];
      await textOption.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(singleChoiceQuestion.controls.answers.length).toBe(1);
      expect(singleChoiceQuestion.controls.answers.controls
          .filter(c => c.controls.correct.value)
          .length)
        .toBe(1);

      expect(singleChoiceQuestion.controls.type.value).toBe(questionTypes.text);
    });
  });

  describe('Changing to single-choice', () => {
    it('Handles transition from multiple-choice to single-choice question correctly', async () => {
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(true));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(true));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(true));
      multipleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      fixture.componentRef.setInput('form', multipleChoiceQuestion);
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      const textOption = options[0];
      await textOption.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(multipleChoiceQuestion.controls.answers.length).toBe(4);
      expect(multipleChoiceQuestion.controls.answers.controls
          .filter(c => c.controls.correct.value)
          .length)
        .toBe(1);

      expect(multipleChoiceQuestion.controls.type.value).toBe(questionTypes.single);
    });

    it('Handles transition from text to single-choice question correctly', async () => {
      textQuestion.controls.answers.push(emptyAnswer(true));
      textQuestion.controls.answers.push(emptyAnswer(true));
      textQuestion.controls.answers.push(emptyAnswer(true));
      fixture.componentRef.setInput('form', textQuestion);
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      const textOption = options[0];
      await textOption.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(textQuestion.controls.answers.length).toBe(2);
      expect(textQuestion.controls.answers.controls
          .filter(c => c.controls.correct.value)
          .length)
        .toBe(1);

        expect(textQuestion.controls.answers.controls
          .filter(c => !c.controls.correct.value)
          .length)
        .toBe(1);

      expect(textQuestion.controls.type.value).toBe(questionTypes.single);
    });
  });

  describe('Changing to multiple-choice', () => {
    it('Handles transition from single-choice to multiple-choice question correctly', async () => {
      singleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      singleChoiceQuestion.controls.answers.push(emptyAnswer(false));
      fixture.componentRef.setInput('form', singleChoiceQuestion);
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      const textOption = options[1];
      await textOption.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(singleChoiceQuestion.controls.answers.length).toBe(4);
      expect(singleChoiceQuestion.controls.answers.controls
          .filter(c => c.controls.correct.value)
          .length)
        .toBe(1);

      expect(singleChoiceQuestion.controls.type.value).toBe(questionTypes.multi);
    });

    it('Handles transition from text to multiple-choice question correctly (text question has more answers than the limit for multiple-choice)', async () => {
      for (let i = textQuestion.controls.answers.length; i <= quizValidationRules.questions.answers.text.maxlength; i++) {
        textQuestion.controls.answers.push(emptyAnswer(true));
      }
      fixture.componentRef.setInput('form', textQuestion);
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      const textOption = options[1];
      await textOption.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(textQuestion.controls.answers.length).toBe(10);
      expect(textQuestion.controls.answers.controls
          .filter(c => c.controls.correct.value)
          .length)
        .toBe(10);

      expect(textQuestion.controls.type.value).toBe(questionTypes.multi);
    });

    it('Handles transition from text to multiple-choice question correctly (text question has fewer answers than the minimum)', async () => {
      fixture.componentRef.setInput('form', textQuestion);
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      const textOption = options[1];
      await textOption.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(textQuestion.controls.answers.length).toBe(2);
      expect(textQuestion.controls.answers.controls
          .filter(c => c.controls.correct.value)
          .length)
        .toBe(1);

      expect(textQuestion.controls.answers.controls
        .filter(c => !c.controls.correct.value)
        .length)
      .toBe(1);

      expect(textQuestion.controls.type.value).toBe(questionTypes.multi);
    });
  });
});
