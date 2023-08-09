import { FormBuilder, FormArray, FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { validationRules } from '../../../../constants/validationRules.constants';

export class TextAnswersManager {
  private readonly fb: FormBuilder;

  form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>;

  private readonly maximumAmountOfAnswers = 15;
  private readonly minimumAmountOfAnswers = 1;

  constructor(fb: FormBuilder, form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>) {
    this.fb = fb;
    this.form = form;
  }

  /**
   * Pushes a new correct answer field to the form array. If the form
   * is at maximum capacity, this method will silently fail.
   * @param value the initial value of the added field.
   */
  addField(value = ''): void {
    if (this.form.length < this.maximumAmountOfAnswers) {
      this.form.push(this.fb.group({
        value: [value, [Validators.required, Validators.maxLength(validationRules.quiz.question.answers.value.maxlength)]],
        correct: [true],
      }))
    }
  }

  /**
   * Removes the field at the given ``index``. If the form array has
   * only one answer, this method will fail silently.
   * @param index the index of the form control
   * @throws if no form control can be found at the given index.
   */
  removeFieldAt(index: number): void {
    const exists = this.form.controls[index];
    if (!exists) {
      throw new Error(`Field at index ${index} could not be found!`);
    }

    if (this.form.length > this.minimumAmountOfAnswers) {
      this.form.removeAt(index);
    }
  }

  /**
   * Retrieves the validation errors of the form control at the given index.
   * @param index the index of the form control
   * @returns an object with validation errors or ``null`` if there are no validation errors.
   * @throws if no form control can be found at the given index;
   */
  getErrorsAt(index: number): ValidationErrors | null {
    const form = this.form.controls[index];
    if (!form) {
      throw new Error(`Cannot retrieve errors at index ${index}!`);
    }

    return form.controls.value.errors;
  }

  get canRemoveFields(): boolean {
    return this.form.length > this.minimumAmountOfAnswers;
  }

  get canAddField(): boolean {
    return this.form.length < this.maximumAmountOfAnswers;
  }

  get answers(): FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>[] {
    return this.form.controls;
  }
}