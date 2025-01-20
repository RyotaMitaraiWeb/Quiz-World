import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { multipleChoiceQuestionNoteless, multipleChoiceQuestionWithNotes, sampleQuestions } from '../sample-test-questions';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
describe('TextQuestionComponent', () => {
  let component: MultipleChoiceQuestionComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionComponent>;
  let form: SharedQuizFormService;
  let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MultipleChoiceQuestionComponent, NoopAnimationsModule],
      })
      .compileComponents();

      fixture = TestBed.createComponent(MultipleChoiceQuestionComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      form = TestBed.inject(SharedQuizFormService);
      component = fixture.componentInstance;
    });

    function setup(question = multipleChoiceQuestionNoteless) {
      const quiz = TestBed.inject(QuizStore);
      quiz.updateQuiz({ ...QuizService.emptyQuiz, questions: sampleQuestions});
      form.populate({ ...QuizService.emptyQuiz, questions: sampleQuestions });
      fixture.componentRef.setInput('question', question);
      fixture.detectChanges();
    }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('Maps to the correct question in the form and handles answer binding correctly', async () => {
      setup(multipleChoiceQuestionWithNotes);
      const [c1, c2, c3] = await loader.getAllHarnesses(MatCheckboxHarness);
      const [value1, value2, value3] = multipleChoiceQuestionWithNotes.answers!.map(q => q.id);
      await c1.check();

      await fixture.whenStable();

      const oneAnswerValue = component.form()?.controls.currentAnswer.value as string[];
      expect(oneAnswerValue).toEqual([value1]);

      await c1.uncheck();
      await fixture.whenStable();

      const emptyAnswer = component.form()?.controls.currentAnswer.value as string[];

      expect(emptyAnswer).toEqual([]);

      await c2.check();
      await c1.check();
      await fixture.whenStable();

      const twoAnswers = component.form()?.controls.currentAnswer.value as string[];
      expect(twoAnswers).toEqual([value2, value1]);

      await c2.uncheck();
      await fixture.whenStable();
      const oneAnswerAfterUncheck = component.form()?.controls.currentAnswer.value as string[];
      expect(oneAnswerAfterUncheck).toEqual([value1]);

      await c2.check();
      await c3.check();
      await fixture.whenStable();

      const allAnswers = component.form()?.controls.currentAnswer.value as string[];
      expect(allAnswers).toEqual([value1, value2, value3]);
    });
});
