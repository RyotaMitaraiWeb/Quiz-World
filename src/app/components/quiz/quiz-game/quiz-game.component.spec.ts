import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizGameComponent } from './quiz-game.component';
import { sampleQuestionsCorrectAnswers, sampleQuestions, singleChoiceQuestionNoteless } from '../sample-test-questions';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatRadioButtonHarness } from '@angular/material/radio/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { QuizDetails } from '../../../services/quiz/types';
import { AnswerService } from '../../../services/answer/answer.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const sampleQuiz: QuizDetails = {
  id: 1,
  title: 'quiz',
  description: 'description',
  instantMode: false,
  questions: sampleQuestions,
  creatorId: '1',
  creatorUsername: 'admin',
  version: 1,
  createdOn: '0001-01-01T00:00:00',
  updatedOn: '0001-01-01T00:00:00',
};

describe('QuizGameComponent', () => {
  let component: QuizGameComponent;
  let fixture: ComponentFixture<QuizGameComponent>;
  let loader: HarnessLoader;
  let answerService: AnswerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizGameComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizGameComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    answerService = TestBed.inject(AnswerService);

    fixture.detectChanges();
  });

  function setup(instantMode = false) {
    component.initialize({ ...sampleQuiz, instantMode });
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  describe('Grade button', () => {
    it('is not visible if the quiz is in instant mode', () => {
      setup(true);

      const button = document.querySelector('#submit');
      expect(button).toBeNull();
    });

    it('is enabled and disabled when appropriate', async () => {
      setup();

      const spy = spyOn(answerService, 'getCorrectAnswersForAllQuestions').and.returnValue(of(sampleQuestionsCorrectAnswers));

      const radios = await loader.getAllHarnesses(MatRadioButtonHarness);
      const fields = await loader.getAllHarnesses(MatInputHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Check my answers' }));
      expect(await button.isDisabled()).toBeTrue();

      for (const radio of radios) {
        await radio.check();
      }

      for (const checkbox of checkboxes) {
        await checkbox.check();
      }

      for (const field of fields) {
        await field.setValue('test');
      }

      await fixture.whenStable();

      expect(await button.isDisabled()).toBeFalse();

      await fields[0].setValue('');
      await fixture.whenStable();

      expect(await button.isDisabled()).toBeTrue();

      await fields[0].setValue('1');

      await fixture.whenStable();


      await button.click();
      await fixture.whenStable();

      // make sure that the button was actually clicked
      expect(spy).toHaveBeenCalled();
      expect(await button.isDisabled()).toBeTrue();
    });
  });

  describe('Stats', () => {
    it('Stats are updated in instant mode', async () => {
      setup(true);
      spyOn(answerService, 'getCorrectAnswersForQuestionById').and.returnValue(of({
        id: singleChoiceQuestionNoteless.id,
        answers: singleChoiceQuestionNoteless.answers!,
      }));

      const radios = await loader.getAllHarnesses(MatRadioButtonHarness);
      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Check my answer' }));

      await radios[0].check();
      await fixture.whenStable();

      await button.click();
      await fixture.whenStable();

      const counts = fixture.debugElement
        .queryAll(By.css('.question-count'))
        .map(el => el.nativeElement.textContent);

      expect(counts).toEqual(['1', '0', '5']);
    });

    it('Stats are updated in non-instant mode', async () => {
      setup();
      spyOn(answerService, 'getCorrectAnswersForAllQuestions').and.returnValue(of(sampleQuestionsCorrectAnswers));

      const radios = await loader.getAllHarnesses(MatRadioButtonHarness);
      const fields = await loader.getAllHarnesses(MatInputHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);

      const button = await loader.getHarness(MatButtonHarness.with({ text: 'Check my answers' }));
      expect(await button.isDisabled()).toBeTrue();

      for (const radio of radios) {
        await radio.check();
      }

      for (const checkbox of checkboxes) {
        await checkbox.check();
      }

      for (const field of fields) {
        await field.setValue('test');
      }

      await fixture.whenStable();

      await button.click();
      await fixture.whenStable();

      const counts = fixture.debugElement
        .queryAll(By.css('.question-count'))
        .map(el => el.nativeElement.textContent);

      expect(counts).toEqual(['2', '4']);
    });
  });
});
