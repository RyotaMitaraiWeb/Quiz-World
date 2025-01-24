import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSessionQuestionComponent } from './quiz-session-question.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { multipleChoiceQuestionNoteless, sampleQuestions, singleChoiceQuestionNoteless, singleChoiceQuestionWithNotes, textQuestionNoteless } from '../sample-test-questions';
import { GradedAnswer, SessionQuestion } from '../../../services/quiz/types';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatRadioButtonHarness } from '@angular/material/radio/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AnswerService } from '../../../services/answer/answer.service';
import { of } from 'rxjs';

describe('QuizSessionQuestionComponent', () => {
  let component: QuizSessionQuestionComponent;
  let fixture: ComponentFixture<QuizSessionQuestionComponent>;
  let form: SharedQuizFormService;
  let loader: HarnessLoader;
  let answerService: AnswerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSessionQuestionComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSessionQuestionComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    form = TestBed.inject(SharedQuizFormService);
    answerService = TestBed.inject(AnswerService);
    fixture.detectChanges();
  });

  function setup(question: SessionQuestion, instantMode = true) {
    const quiz = TestBed.inject(QuizStore);
    quiz.updateQuiz({ ...QuizService.emptyQuiz, questions: sampleQuestions, instantMode });
    form.populate({ ...QuizService.emptyQuiz, questions: sampleQuestions });
    fixture.componentRef.setInput('questionId', question.id);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup(singleChoiceQuestionNoteless);
    expect(component).toBeTruthy();
  });

  describe('Grade button state', () => {
    it('is not visible if the quiz is not in instant mode', async () => {
      setup(singleChoiceQuestionNoteless, false);
      const button = document.querySelector('button');
      expect(button).toBeNull();
    });

    it('Enables and disables the button for single-choice questions in the right circumstances', async () => {
      setup(singleChoiceQuestionNoteless);
      const button = await loader.getHarness(MatButtonHarness);
      const [radio1, radio2] = await loader.getAllHarnesses(MatRadioButtonHarness);

      expect(await button.isDisabled()).toBeTrue();

      await radio1.check();
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();

      await radio2.check();
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();
    });

    it('Enables and disables the button for multiple-choice questions in the right circumstances', async () => {
      setup(multipleChoiceQuestionNoteless);
      const button = await loader.getHarness(MatButtonHarness);
      const [c1, c2, c3] = await loader.getAllHarnesses(MatCheckboxHarness);

      expect(await button.isDisabled()).toBeTrue();

      await c1.check();
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();

      await c2.check();
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();

      await c2.uncheck();
      await fixture.whenStable();
      expect(await button.isDisabled()).toBeFalse();

      await c1.uncheck();
      await fixture.whenStable();
      expect(await button.isDisabled()).toBeTrue();

      await c1.check();
      await c2.check();
      await c3.check();
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();
    });

    it('Enables and disables the button for text questions in the right circumstances', async () => {
      setup(textQuestionNoteless);
      const button = await loader.getHarness(MatButtonHarness);
      const field = await loader.getHarness(MatInputHarness);

      expect(await button.isDisabled()).toBeTrue();

      await field.setValue('test');
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();

      await field.setValue('');
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeTrue();
    });
  });

  describe('Grading process', () => {
    it('Disables the form and button once graded (instant mode)', async () => {
      setup(singleChoiceQuestionNoteless, true);

      const correctAnswer: GradedAnswer = {
        id: singleChoiceQuestionNoteless.id,
        answers: [
          singleChoiceQuestionNoteless!.answers![0]],
      };

      spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
        of(
          correctAnswer,
        ),
      );

      const button = await loader.getHarness(MatButtonHarness);
      const [radio1] = await loader.getAllHarnesses(MatRadioButtonHarness);

      await radio1.check();
      await fixture.whenStable();

      await button.click();
      await fixture.whenStable();

      expect(component.form()?.disabled).toBeTrue();
      expect(await button.isDisabled()).toBeTrue();
    });

    it('Shows notes if there are such after grading', async () => {
      setup(singleChoiceQuestionWithNotes, true);
      expect(document.querySelector('.question-notes')).toBeNull();

      const correctAnswer: GradedAnswer = {
        id: singleChoiceQuestionNoteless.id,
        answers: [
          singleChoiceQuestionNoteless!.answers![0]],
      };

      spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
        of(
          correctAnswer,
        ),
      );

      const button = await loader.getHarness(MatButtonHarness);
      const [radio1] = await loader.getAllHarnesses(MatRadioButtonHarness);

      await radio1.check();
      await fixture.whenStable();

      await button.click();
      await fixture.whenStable();

      const notes = document.querySelector('.question-notes');
      expect(notes).not.toBeNull();

    });

    it('Does not show notes if there are no such after grading', async () => {
      setup(singleChoiceQuestionNoteless, true);
      expect(document.querySelector('.question-notes')).toBeNull();

      const correctAnswer: GradedAnswer = {
        id: singleChoiceQuestionNoteless.id,
        answers: [
          singleChoiceQuestionNoteless!.answers![0]],
      };

      spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
        of(
          correctAnswer,
        ),
      );

      const button = await loader.getHarness(MatButtonHarness);
      const [radio1] = await loader.getAllHarnesses(MatRadioButtonHarness);

      await radio1.check();
      await fixture.whenStable();

      await button.click();
      await fixture.whenStable();

      const notes = document.querySelector('.question-notes');
      expect(notes).toBeNull();
    });

    it('Correctly denotes the question as correct', async () => {
      setup(singleChoiceQuestionNoteless, true);

      const correctAnswer: GradedAnswer = {
        id: singleChoiceQuestionNoteless.id,
        answers: [
          singleChoiceQuestionNoteless!.answers![0]],
      };

      spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
        of(
          correctAnswer,
        ),
      );

      const button = await loader.getHarness(MatButtonHarness);
      const [radio1] = await loader.getAllHarnesses(MatRadioButtonHarness);

      await radio1.check();
      await fixture.whenStable();

      await button.click();
      await fixture.whenStable();

      expect(document.querySelector('.correct')).not.toBeNull();
    });

    it('Correctly denotes the question as incorrect', async () => {
      setup(singleChoiceQuestionWithNotes, true);
      expect(document.querySelector('.question-notes')).toBeNull();

      const correctAnswer: GradedAnswer = {
        id: singleChoiceQuestionNoteless.id,
        answers: [
          singleChoiceQuestionNoteless!.answers![0]],
      };

      spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
        of(
          correctAnswer,
        ),
      );

      const button = await loader.getHarness(MatButtonHarness);
      const radios = await loader.getAllHarnesses(MatRadioButtonHarness);
      const radio2 = radios[1];

      await radio2.check();
      await fixture.whenStable();

      await button.click();
      await fixture.whenStable();

      expect(document.querySelector('.incorrect')).not.toBeNull();
    });

    it('Correctly handles grading in non-instant mode', async () => {
      setup(singleChoiceQuestionNoteless, true);
      const [radio1] = await loader.getAllHarnesses(MatRadioButtonHarness);

      await radio1.check();
      await fixture.whenStable();

      /*
        this is pretty hacky, but this basically simulates the parent component
        updating the correct answers in non-instant mode.

        This is done here just so I don't have to lift the test up one component.
       */
      spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(
        of(
          [
            {
              id: singleChoiceQuestionNoteless.id,
              answers: [singleChoiceQuestionNoteless!.answers![0]],
            },
          ] as unknown as GradedAnswer,
        ),
      );

      const button = await loader.getHarness(MatButtonHarness);
      await button.click();

      await fixture.whenStable();

      const question = document.querySelector('.correct');
      expect(question).not.toBeNull();
    });
  });
});
