import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { QuestionForm, QuizBasicDataForm } from '../types';
import { MatStepperModule } from '@angular/material/stepper';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';
import { QuizFormBasicDataComponent } from '../quiz-form-basic-data/quiz-form-basic-data.component';
import { MatButtonModule } from '@angular/material/button';
import { QuizFormQuestionsComponent } from '../quiz-form-questions/quiz-form-questions.component';
import { emptySingleChoiceQuestion } from '../emptyForms';

@Component({
  selector: 'app-quiz-form',
  imports: [
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    QuizFormBasicDataComponent,
    QuizFormQuestionsComponent,
],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizFormComponent {
  basicDataForm: QuizBasicDataForm = new FormGroup({
    title: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(quizValidationRules.title.minlength),
          Validators.maxLength(quizValidationRules.title.maxlength),
        ],
      },
    ),
    description: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(quizValidationRules.description.minlength),
          Validators.maxLength(quizValidationRules.description.maxlength),
        ],
      },

    ),
    instantMode: new FormControl(false),
  });

  readonly questionsForm = new FormArray<FormGroup<QuestionForm>>([emptySingleChoiceQuestion()]);
}
