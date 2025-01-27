import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerField, QuestionForm } from './types';
import { generateUniqueId } from '../../util/generateUniqueId';
import { questionTypes } from '../../common/questionTypes';
import { quizValidationRules } from '../../common/validationRules/quiz-form';

export const emptyAnswer = (correct: boolean) =>
   new FormGroup<AnswerField>(
    {
      randomId: new FormControl(generateUniqueId()),
      value: new FormControl('',
        {
          validators: [
            Validators.required,
            Validators.maxLength(quizValidationRules.questions.answers.maxlength),
          ],
        },
    ),
      correct: new FormControl(correct),
    },
  );

export const emptySingleChoiceQuestion = () =>
  new FormGroup<QuestionForm>(
    {
      randomId: new FormControl(generateUniqueId()),
      type: new FormControl(questionTypes.single),
      prompt: new FormControl('',
        {
          validators: [
            Validators.required,
            Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
          ],
        },
    ),
      notes: new FormControl('',
        {
          validators: [
            Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
          ],
        }),
      answers: new FormArray<FormGroup<AnswerField>>([emptyAnswer(true), emptyAnswer(false)]),
    },
  );

export const emptyMultipleChoiceQuestion = () => new FormGroup<QuestionForm>(
  {
    randomId: new FormControl(generateUniqueId()),
    type: new FormControl(questionTypes.multi),
    prompt: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
        ],
      },
  ),
    notes: new FormControl('',
      {
        validators: [
          Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
        ],
      }),
    answers: new FormArray<FormGroup<AnswerField>>([emptyAnswer(true), emptyAnswer(false)]),
  },
);

export const emptyTextQuestion = () => new FormGroup<QuestionForm>(
  {
    randomId: new FormControl(generateUniqueId()),
    type: new FormControl(questionTypes.text),
    prompt: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
        ],
      },
  ),
    notes: new FormControl('',
      {
        validators: [
          Validators.maxLength(quizValidationRules.questions.prompt.maxlength),
        ],
      }),
    answers: new FormArray<FormGroup<AnswerField>>([emptyAnswer(true)]),
  },
);