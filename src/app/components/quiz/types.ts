import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { question } from '../../common/questionTypes';

export interface QuestionForm {
  prompt: FormControl<string | null>;
  type: FormControl<question | null>;
  answers: FormArray<FormGroup<AnswerField>>;
  notes: FormControl<string | null>;
  randomId: FormControl<string | null>;
}

export interface AnswerField {
  value: FormControl<string | null>;
  correct: FormControl<boolean | null>;
  randomId: FormControl<string | null>;
}

export type QuizBasicDataForm = FormGroup<{
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  instantMode: FormControl<boolean | null>;
}>
