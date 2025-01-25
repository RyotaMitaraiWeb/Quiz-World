import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnswerField } from '../../types';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddAnswerButtonComponent } from '../../../common/buttons/add-answer-button/add-answer-button.component';
import { generateUniqueId } from '../../../../util/generateUniqueId';
import { quizValidationRules } from '../../../../common/validationRules/quiz-form';
import { emptySingleChoiceQuestion } from '../../emptyForms';
import { DeleteAnswerButtonComponent } from '../../../common/buttons/delete-answer-button/delete-answer-button.component';

@Component({
  selector: 'app-single-choice-question-form',
  imports: [
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AddAnswerButtonComponent,
    DeleteAnswerButtonComponent,
  ],
  templateUrl: './single-choice-question-form.component.html',
  styleUrl: './single-choice-question-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

    const group = new FormGroup<AnswerField>(
      {
        value: new FormControl(''),
        correct: new FormControl(false),
        randomId: new FormControl(generateUniqueId()),
      },
    );

    this.form()!.push(group);
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
}
