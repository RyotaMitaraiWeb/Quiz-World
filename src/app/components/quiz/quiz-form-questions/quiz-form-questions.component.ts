import { ChangeDetectionStrategy, Component, inject, input, viewChildren, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SingleChoiceQuestionFormComponent } from '../question-forms/single-choice-question-form/single-choice-question-form.component';
import { MultipleChoiceQuestionFormComponent } from '../question-forms/multiple-choice-question-form/multiple-choice-question-form.component';
import { TextQuestionFormComponent } from '../question-forms/text-question-form/text-question-form.component';
import { MatIconModule } from '@angular/material/icon';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';
import { emptySingleChoiceQuestion } from '../emptyForms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { question } from '../../../common/questionTypes';
import { QuestionTypeSelectComponent } from '../question-type-select/question-type-select.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SingleInputErrorPipe } from '../../../pipes/single-input-error/single-input-error.pipe';
import { quizErrors } from '../../../common/validationErrors/quiz-form';
import { SharedCreateEditQuizFormService } from '../../../services/shared/shared-create-edit-quiz-form.service';

@Component({
  selector: 'app-quiz-form-questions',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    SingleChoiceQuestionFormComponent,
    MultipleChoiceQuestionFormComponent,
    TextQuestionFormComponent,
    QuestionTypeSelectComponent,
    SingleInputErrorPipe,
  ],
  templateUrl: './quiz-form-questions.component.html',
  styleUrl: './quiz-form-questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class QuizFormQuestionsComponent implements AfterViewChecked {
  private readonly sharedForm = inject(SharedCreateEditQuizFormService);
  readonly form = this.sharedForm.questionsForm;

  promptFields = viewChildren('promptField');

  edit = input(false);

  addQuestion(event: MouseEvent) {
    event.preventDefault();
    this.form.push(emptySingleChoiceQuestion());

    this.shouldFocusPromptField = true;
  }

  deleteQuestion(questionId: string, event: MouseEvent) {
    event.preventDefault();
    const form = this.form;
    const index = form.controls.findIndex(q => q.controls.randomId.value === questionId);

    const indexToFocus = index === form.length - 1 ? index - 1 : index + 1;
    this.focusNextPromptField(indexToFocus);
    if (index !== -1) {
      form.removeAt(index);
    }
  }

  /**
   * Used to focus the newest prompt field when a question is added
   */
  private shouldFocusPromptField = false;

  ngAfterViewChecked() {
    if (this.shouldFocusPromptField) {
      this.focusNewestPromptField();
    }

    this.shouldFocusPromptField = false;
  }

  protected subtitleLabels: Record<question, string> = {
    SingleChoice: 'Single-choice question',
    MultipleChoice: 'Multiple-choice question',
    Text: 'Text question',
  };


  protected minQuestionsCount = quizValidationRules.questions.minlength;
  protected maxQuestionsCount = quizValidationRules.questions.maxlength;

  protected promptMaxLength = quizValidationRules.questions.prompt.maxlength;
  protected notesMaxLength = quizValidationRules.questions.notes.maxlength;

  protected promptErrorMessages = quizErrors.questions.prompt;
  protected notesErrorMessages = quizErrors.questions.notes;

  private focusNewestPromptField() {
    const lastIndex = this.form.length;
    const promptField = document.querySelector(`#prompt-${lastIndex}`) as HTMLTextAreaElement | null;
    promptField?.focus();
  }

  /**
   * Handles focusing of a different prompt field before one has been removed
   */
  private focusNextPromptField(index: number) {
    const promptField = document.querySelector(`#prompt-${index + 1}`) as HTMLTextAreaElement | null;
    promptField?.focus();
  }
}
