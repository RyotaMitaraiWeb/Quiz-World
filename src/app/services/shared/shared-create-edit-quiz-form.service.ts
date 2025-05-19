import { Injectable } from '@angular/core';
import { QuestionForm, QuizBasicDataForm } from '../../components/quiz/types';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { quizValidationRules } from '../../common/validationRules/quiz-form';
import { emptySingleChoiceQuestion } from '../../components/quiz/emptyForms';

@Injectable({
  providedIn: 'root',
})
export class SharedCreateEditQuizFormService {
  readonly basicDataForm: QuizBasicDataForm = new FormGroup({
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
