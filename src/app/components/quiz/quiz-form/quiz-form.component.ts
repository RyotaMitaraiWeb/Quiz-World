import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { question, questionTypes } from '../../../common/questionTypes';
import { QuestionForm, AnswerField, QuizBasicDataForm } from '../types';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { quizValidationRules } from '../../../common/validationRules/quiz-form';

@Component({
  selector: 'app-quiz-form',
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss',
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

  questionsForm = new FormArray<FormGroup<QuestionForm>>([
    new FormGroup({
      prompt: new FormControl('',
        {
          validators: [
            Validators.required,
            Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
          ],
        },
      ),
      type: new FormControl<question | null>(questionTypes.single),
      notes: new FormControl('',
        {
          validators: [
            Validators.maxLength(quizValidationRules.questions.notes.maxlength),
          ],
        },
      ),
      answers: new FormArray<FormGroup<AnswerField>>([
        new FormGroup<AnswerField>({
          value: new FormControl('',
            {
              validators: [
                Validators.required,
                Validators.maxLength(quizValidationRules.questions.maxlength),
              ],
            },
          ),
          correct: new FormControl(false),
        }),
        new FormGroup<AnswerField>({
          value: new FormControl('',
            {
              validators: [
                Validators.required,
                Validators.maxLength(quizValidationRules.questions.maxlength),
              ],
            },
          ),
          correct: new FormControl(false),
        }),
      ]),
    }),
  ]);
}