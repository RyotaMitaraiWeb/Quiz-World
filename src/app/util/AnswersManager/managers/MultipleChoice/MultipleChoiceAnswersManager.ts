import { FormBuilder, FormArray, FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';

export class MultipleChoiceAnswersManager {
  private readonly fb: FormBuilder;
 form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>;

  private readonly maximumAmountOfAnswers = 10;
  private readonly minimumAmountOfCorrectAnswers = 1;

  constructor(fb: FormBuilder, form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>) {
    this.fb = fb;
    this.form = form;
  }

  /**
   * Returns all answers that are correct or wrong based on the passed ``correct`` parameter
   * @param correct whether to retrieve the correct or wrong answers.
   * @returns An array of all form controls whose ``correct`` value is equal to the provided parameter.
   */
  getAnswersOfCorrectness(correct: boolean) {
    return this.form.controls.filter(form => form.controls.correct.value === correct);
  }

  /**
   * Pushes a new control to the form. Silently fails if there are 10 fields already.
   * @param value the initial value of the control, defaults to an empty string
   * @param correct whether the answer is correct or wrong.
   */
  addField(value = '', correct: boolean): void {
    if (this.canAddAnswersField) {
      this.form.push(
        this.fb.group({
          value: [value, [Validators.required, Validators.maxLength(100)]],
          correct
        })
      );
    }
  }

  /**
   * Gets the form control at the given index in relation to the other
   * form controls of the same correctness (for example, if you pass
   * ``1`` and ``false``, you will get the second wrong answer form control).
   * @param index the index of the form control
   * @param correct whether to retrieve the control from the correct or wrong answers
   * @returns the form control or ``null`` if such cannot be found.
   */
  getFieldAtIndex(index: number, correct: boolean): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }> | null {
    const i = this.getActualIndex(index, correct);
    if (i === -1) {
      return null;
    }

    return this.form.controls[i];
  }

  /**
   * Removes the field at the given index in relation to
   * the other form controls with the same ``correct`` value (for example,
   * if you want to remove the second wrong answer, pass index ``1`` with
   * ``false``). This method silently fails if you attempt to remove the only correct answer.
   * This does not apply to wrong answers; even if there is only one, this method
   * will remove it.
   * @param index the index of the form control
   * @param correct whether to retrieve the form control from the correct or wrong answers.
   * @throws if there is no form control for the given ``index``
   */
  removeFieldAt(index: number, correct: boolean): void {
    const i = this.getActualIndex(index, correct);
    if (i === -1) {
      throw new Error(`Field at index ${index} could not be found!`);
    }

    if ((correct && this.canRemoveCorrectAnswersFields) || (!correct && this.canRemoveWrongAnswersField)) {
      this.form.removeAt(i);
    }
  }

  /**
   * Retrieves validation errors for the form control's ``value`` at the given ``index`` in relation
   * to the other form controls with the same ``correct`` value (for example,
   * passing ``1`` and ``false`` will return the validation errors for the second wrong answer control).
   * @param index the index of the form control
   * @param correct whether to retrieve the control from the correct or wrong answers,
   * @returns An object with validation errors or ``null`` if there are no validation errors.
   */
  getErrorsAt(index: number, correct: boolean): ValidationErrors | null {
    const i = this.getActualIndex(index, correct);
    if (i === -1) {
      throw new Error(`Cannot retrieve errors at index ${index}!`);
    }

    return this.form.controls[i].controls.value.errors;
  }

  get canRemoveCorrectAnswersFields(): boolean {
    return this.getAnswersOfCorrectness(true).length > 1 && this.form.length > 2;
  }

  get canAddAnswersField(): boolean {
    return this.form.length < this.maximumAmountOfAnswers;
  }

  get canRemoveWrongAnswersField(): boolean {
    return this.form.length > 2;
  }

  /**
   * "Translates" the index of the form control in relation to the other
   * controls with the same ``correct`` value to its actual index in the form.
   * 
   * **Examples:**
   * * if we have two correct answers at indices 0 and 2 and two wrong answers
   * at indices 1 and 3, then passing ``1`` and ``true`` will return index ``2``
   * (this is the index of the second correct answer).
   * Passing ``0`` and ``false`` will return index ``1`` (this is the index of the first wrong answer).
   * @param index
   * @param correct 
   * @returns 
   */
  getActualIndex(index: number, correct: boolean) {
    let i = 0;
    return this.form.controls.findIndex((form) => {
      const matchesCorrectness = form.controls.correct.value === correct;
      if (!matchesCorrectness) {
        return false;
      }

      return index === i++;
    });
  }
}