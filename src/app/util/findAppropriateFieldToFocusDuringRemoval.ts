import { FormGroup } from '@angular/forms';
import { AnswerField } from '../components/quiz/types';

export function findAppropriateFieldToFocusDuringRemoval(
  form: FormGroup<AnswerField>[],
  removedAnswer: FormGroup<AnswerField>,
): HTMLTextAreaElement | HTMLInputElement | null {
  // the only remaining answer being removed, in the case of multiple-choice questions
  if (form.length === 1) {
    return null;
  }

  const indexOfRemovedField = form
    .findIndex(field => field.value.randomId === removedAnswer.value.randomId);

  if (indexOfRemovedField === -1) {
    return null;
  }

  // last answer is removed - focus the answer before it
  if (indexOfRemovedField === form.length - 1) {
    const id = form[indexOfRemovedField - 1].value.randomId || '';
    const field = document.getElementById(id) as HTMLTextAreaElement | HTMLInputElement | null;
    return field;
  }

  const id = form[indexOfRemovedField + 1].value.randomId || '';
  const field = document.getElementById(id) as HTMLTextAreaElement | HTMLInputElement | null;
  return field;

}
