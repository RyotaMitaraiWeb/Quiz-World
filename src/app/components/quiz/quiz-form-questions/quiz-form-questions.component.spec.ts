import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormQuestionsComponent } from './quiz-form-questions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormGroup } from '@angular/forms';
import { QuestionForm } from '../types';
import { emptyMultipleChoiceQuestion, emptySingleChoiceQuestion, emptyTextQuestion } from '../emptyForms';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';
import { SharedCreateEditQuizFormService } from '../../../services/shared/shared-create-edit-quiz-form.service';

describe('QuizFormQuestionsComponent', () => {
  let component: QuizFormQuestionsComponent;
  let fixture: ComponentFixture<QuizFormQuestionsComponent>;
  let form: FormArray<FormGroup<QuestionForm>>;
  let singleChoiceQuestion: ReturnType<typeof emptySingleChoiceQuestion>;
  let multipleChoiceQuestion: ReturnType<typeof emptyMultipleChoiceQuestion>;
  let textQuestion: ReturnType<typeof emptyTextQuestion>;
  let sharedForm: SharedCreateEditQuizFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFormQuestionsComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizFormQuestionsComponent);
    component = fixture.componentInstance;

    singleChoiceQuestion = emptySingleChoiceQuestion();
    multipleChoiceQuestion = emptyMultipleChoiceQuestion();
    textQuestion = emptyTextQuestion();
    sharedForm = TestBed.inject(SharedCreateEditQuizFormService);
    sharedForm.questionsForm.push(singleChoiceQuestion);
    sharedForm.questionsForm.push(multipleChoiceQuestion);
    sharedForm.questionsForm.push(textQuestion);
    form = sharedForm.questionsForm;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add question button works and is visible until 100 questions are entered', async () => {
    const button = document.querySelector('.add-question-btn')!;

    const max = quizValidationRules.questions.maxlength;

    expect(button).not.toBeNull();

    for (let i = form.length; i < max; i++) {
      button.dispatchEvent(new MouseEvent('click'));
      await fixture.whenStable();
      fixture.detectChanges();
    }

    expect(document.querySelectorAll('mat-card.question-form').length).toBe(max);
    expect(document.querySelector('.add-question-btn')).toBeNull();
  });

  it('Delete question button works and is visible until there is only one question', async () => {
    const removeButton = () => document.querySelector('.remove-question-btn') as HTMLButtonElement;

    for (let i = form.length; i > quizValidationRules.questions.minlength; i--) {
      const btn = removeButton();

      const q = form.controls[0];
      const id = q.controls.randomId.value;

      btn.click();
      await fixture.whenStable();
      fixture.detectChanges();

      const questions = document.querySelectorAll('mat-card.question-form');
      expect(questions.length).toBe(i - 1);
      expect(form.controls.find(q => q.controls.randomId.value === id)).toBeUndefined();
    }

    expect(removeButton()).toBeNull();
  });
});
