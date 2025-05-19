import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionComponent } from './single-choice-question.component';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { QuizService } from '../../../services/quiz/quiz.service';
import { sampleQuestions, singleChoiceQuestionNoteless, singleChoiceQuestionWithNotes } from '../sample-test-questions';
import { MatRadioButtonHarness } from '@angular/material/radio/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SessionAnswer } from '../../../services/quiz/types';

describe('SingleChoiceQuestionComponent', () => {
  let component: SingleChoiceQuestionComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionComponent>;
  let form: SharedQuizFormService;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleChoiceQuestionComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleChoiceQuestionComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    form = TestBed.inject(SharedQuizFormService);
    component = fixture.componentInstance;
  });

  function setup(question = singleChoiceQuestionNoteless, correctAnswers?: SessionAnswer[]) {
    const quiz = TestBed.inject(QuizStore);
    quiz.updateQuiz({ ...QuizService.emptyQuiz, questions: sampleQuestions});
    form.populate({ ...QuizService.emptyQuiz, questions: sampleQuestions });
    fixture.componentRef.setInput('question', question);
    if (correctAnswers) {
      fixture.componentRef.setInput('correctAnswers', correctAnswers);
    }
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('Maps to the correct question in the form', async () => {
    setup(singleChoiceQuestionWithNotes);
    const radio = await loader.getHarness(MatRadioButtonHarness.with({ label: 'right'}));
    await radio.check();

    const value = component.form()?.controls.currentAnswer.value;
    expect(value).toBe(singleChoiceQuestionWithNotes.answers?.[0].id);
  });
});
