import { ChangeDetectionStrategy, Component, input, signal, ViewEncapsulation } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { quizValidationRules } from '../../../../common/validationRules/quiz-form';
import { emptyAnswer, emptyTextQuestion } from '../../emptyForms';
import { AnswerField } from '../../types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HideVisuallyDirective } from '../../../../directives/hide-visually/hide-visually.directive';
import { AddAnswerButtonComponent } from '../../../common/buttons/add-answer-button/add-answer-button.component';
import { DeleteAnswerButtonComponent } from '../../../common/buttons/delete-answer-button/delete-answer-button.component';
import { quizErrors } from '../../../../common/validationErrors/quiz-form';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SingleInputErrorPipe } from '../../../../pipes/single-input-error/single-input-error.pipe';

@Component({
  selector: 'app-text-question-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    HideVisuallyDirective,
    AddAnswerButtonComponent,
    DeleteAnswerButtonComponent,
    SingleInputErrorPipe,
  ],
  templateUrl: './text-question-form.component.html',
  styleUrl: './text-question-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextQuestionFormComponent {
  form = input.required<FormArray<FormGroup<AnswerField>>>();

  /**
    Using ``computed`` does not update the value after the form is mutated,
    so this has to be tracked explicitly
  */
  answersCount = signal(emptyTextQuestion().controls.answers.length);

  addNewAnswer(event: MouseEvent) {
    event.preventDefault();

    this.form()!.push(emptyAnswer(true));
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

  protected minAnswersCount = quizValidationRules.questions.answers.text.minlength;
  protected maxAnswersCount = quizValidationRules.questions.answers.text.maxlength;

  protected answersErrorMessages = quizErrors.questions.answers;
  protected answersMaxLength = quizValidationRules.questions.answers.maxlength;
}
