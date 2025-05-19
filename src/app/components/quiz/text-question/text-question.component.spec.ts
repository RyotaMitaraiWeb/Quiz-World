import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextQuestionComponent } from './text-question.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { SharedQuizFormService } from '../../../services/shared/quiz-form/shared-quiz-form.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { sampleQuestions, textQuestionNoteless, textQuestionWithNotes } from '../sample-test-questions';
import { QuizStore } from '../../../store/quiz/quiz.store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
describe('TextQuestionComponent', () => {
  let component: TextQuestionComponent;
  let fixture: ComponentFixture<TextQuestionComponent>;
  let form: SharedQuizFormService;
  let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TextQuestionComponent, NoopAnimationsModule],
      })
      .compileComponents();

      fixture = TestBed.createComponent(TextQuestionComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      form = TestBed.inject(SharedQuizFormService);
      component = fixture.componentInstance;
    });

    function setup(question = textQuestionNoteless) {
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

  it('Maps to the correct question in the form', async () => {
      setup(textQuestionWithNotes);
      const fields = await loader.getAllHarnesses(MatInputHarness);
      const field = fields[0];
      await field.setValue('test');

      const value = component.form()?.controls.currentAnswer.value;
      expect(value).toBe('test');
    });
});
