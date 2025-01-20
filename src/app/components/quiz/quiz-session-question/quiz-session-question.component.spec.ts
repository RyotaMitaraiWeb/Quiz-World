import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSessionQuestionComponent } from './quiz-session-question.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { multipleChoiceQuestionNoteless, sampleQuestions, singleChoiceQuestionNoteless, textQuestionNoteless } from '../sample-test-questions';
import { SessionQuestion } from '../../../services/quiz/types';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatRadioButtonHarness } from '@angular/material/radio/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizSessionQuestionComponent', () => {
  let component: QuizSessionQuestionComponent;
  let fixture: ComponentFixture<QuizSessionQuestionComponent>;
  let form: SharedQuizFormService;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSessionQuestionComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSessionQuestionComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    form = TestBed.inject(SharedQuizFormService);
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
});
