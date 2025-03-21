import { ChangeDetectionStrategy, Component, input, signal, ViewEncapsulation } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnswerField } from '../../types';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddAnswerButtonComponent } from '../../../common/buttons/add-answer-button/add-answer-button.component';
import { quizValidationRules } from '../../../../common/validationRules/quiz-form';
import { emptyAnswer, emptySingleChoiceQuestion } from '../../emptyForms';
import { DeleteAnswerButtonComponent } from '../../../common/buttons/delete-answer-button/delete-answer-button.component';
import { HideVisuallyDirective } from '../../../../directives/hide-visually/hide-visually.directive';
import { quizErrors } from '../../../../common/validationErrors/quiz-form';
import { SingleInputErrorPipe } from '../../../../pipes/single-input-error/single-input-error.pipe';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FocusNewlyAddedFieldDirective } from '../../../../directives/focus-newly-added-field/focus-newly-added-field.directive';

@Component({
  selector: 'app-single-choice-question-form',
  imports: [
    MatRadioModule,
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
  templateUrl: './single-choice-question-form.component.html',
  styleUrl: './single-choice-question-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SingleChoiceQuestionFormComponent {
  form = input.required<FormArray<FormGroup<AnswerField>>>();

  /**
    Using ``computed`` does not update the value after the form is mutated,
    so this has to be tracked explicitly
  */
  answersCount = signal(emptySingleChoiceQuestion().controls.answers.length);

  addNewAnswer(event: MouseEvent) {
    event.preventDefault();

    this.form()!.push(emptyAnswer(false));
    this.answersCount.update(v => v + 1);
  }

  removeAnswer(answerId: string, event: MouseEvent) {
    event.preventDefault();
    const form = this.form();
    const answerIndex = form.controls.findIndex(c => c.controls.randomId.value === answerId);

    if (answerIndex !== -1) {
      form.removeAt(answerIndex);
      this.answersCount.update(v => v - 1);
    }
  }

  protected minAnswersCount = quizValidationRules.questions.answers.singleChoice.minlength;
  protected maxAnswersCount = quizValidationRules.questions.answers.singleChoice.maxlength;

  protected answersErrorMessages = quizErrors.questions.answers;
  protected answersMaxLength = quizValidationRules.questions.answers.maxlength;
}
