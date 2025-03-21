import { ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnswerField } from '../../types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddAnswerButtonComponent } from '../../../common/buttons/add-answer-button/add-answer-button.component';
import { DeleteAnswerButtonComponent } from '../../../common/buttons/delete-answer-button/delete-answer-button.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { emptyAnswer } from '../../emptyForms';
import { quizValidationRules } from '../../../../common/validationRules/quiz-form';
import { HideVisuallyDirective } from '../../../../directives/hide-visually/hide-visually.directive';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SingleInputErrorPipe } from '../../../../pipes/single-input-error/single-input-error.pipe';
import { quizErrors } from '../../../../common/validationErrors/quiz-form';
import { FocusNewlyAddedFieldDirective } from '../../../../directives/focus-newly-added-field/focus-newly-added-field.directive';

@Component({
  selector: 'app-multiple-choice-question-form',
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    AddAnswerButtonComponent,
    DeleteAnswerButtonComponent,
    HideVisuallyDirective,
    SingleInputErrorPipe,
    FocusNewlyAddedFieldDirective,
  ],
  templateUrl: './multiple-choice-question-form.component.html',
  styleUrl: './multiple-choice-question-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MultipleChoiceQuestionFormComponent {
  form = input.required<FormArray<FormGroup<AnswerField>>>();


  answersCount = computed(() => this.wrongAnswersCount() + this.correctAnswersCount());

  wrongAnswersCount = signal(1);
  correctAnswersCount = signal(1);

  addNewAnswer(correct: boolean, event: MouseEvent) {
    event.preventDefault();
    const answer = emptyAnswer(correct);
    this.form().push(answer);
    this.incrementAnswerCount(correct);
  }

  removeAnswer(answerId: string, correct: boolean, event: MouseEvent) {
    event.preventDefault();
    const form = this.form();
    const answerIndex = form.controls.findIndex(c => c.controls.randomId.value === answerId);

    if (answerIndex !== -1) {
      form.removeAt(answerIndex);
      this.decrementAnswerCount(correct);
    }
  }

  private incrementAnswerCount(correct: boolean) {
    if (correct) {
      this.correctAnswersCount.update(v => v + 1);
    } else {
      this.wrongAnswersCount.update(v => v + 1);
    }
  }

  private decrementAnswerCount(correct: boolean) {
    if (correct) {
      this.correctAnswersCount.update(v => v - 1);
    } else {
      this.wrongAnswersCount.update(v => v - 1);
    }
  }

  protected minAnswersCount = quizValidationRules.questions.answers.multipleChoice.minlength;
  protected maxAnswersCount = quizValidationRules.questions.answers.multipleChoice.maxlength;
  protected minCorrectAnswersCount = quizValidationRules.questions.answers.multipleChoice.minlengthCorrect;

  protected answersErrorMessages = quizErrors.questions.answers;
  protected answersMaxLength = quizValidationRules.questions.answers.maxlength;
}
