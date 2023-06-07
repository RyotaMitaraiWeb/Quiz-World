import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

/**
 * A class that provides a unified API for managing answer fields.
 * You pass the answers control that you want to work with to the constructor.
 * Any changes done through the manager apply to the passed form.
 * In addition, if the form is modified from the outside (e.g. through other APIs),
 * the manager will correctly derive from the new state.
 * This makes the manager ideal if the form is passed in a huge and/or complex chain
 * of components.
 */
export class AnswersManager {
  private readonly fb;
  private readonly _form;

  constructor(form: FormArray<FormGroup<{ answer: FormControl<string | null> }>>, fb: FormBuilder) {
    this._form = form;
    this.fb = fb;
  }

  /**
   * Returns the form that was passed to the manager.
   */
  get form() {
    return this._form;
  }

  /**
   * Pushes a new group of control to the form.
   * This control includes the needed validations.
   * An argument can be passed to pass the control with a specific value.
   * @param value defaults to an empty string if not passed
   */
  addField(value = ''): void {    
    this.form.push(this.createNewControl(value));    
  }

  /**
   * Removes the control at the given index from the form.
   * @param index 
   * @throws if the form has only one answer or if there is no control at the given
   * ``index``
   */
  removeFieldAt(index: number): void {
    if (this.form.length <= 1) {
      throw new Error('You cannot delete the only remaining answer!');
    } else if (index < 0 || index >= this.form.length) {
      throw new Error('Field does not exist');
    }

    this.form.removeAt(index);
  }

  /**
   * Returns an object containing all validation errors for the field at the
   * given index or ``null`` if there are no validation errors.
   * @param index 
   * @returns an object containing the validation errors, where each key is the failed
   * validation, or ``null`` if the field is valid.
   * @throws if the control at the given ``index`` does not exist
   */
  getErrorsAt(index: number): ValidationErrors | null {
    const controls = this.form.controls[index];
    if (!controls) {
      throw new Error('Field does not exist');
    }

    return controls.controls.answer.errors;
  }

  /**
   * Indicates whether the form has more than one answer.
   */
  get hasMoreThanOneAnswer(): boolean {
    return this.form.length > 1;
  }

  /**
   * Provides an easy way to create a new group of a form control.
   */
  private createNewControl(value = ''): FormGroup<{ answer: FormControl<string | null>; }> {
    return this.fb.group({ answer: [value, [Validators.required, Validators.maxLength(100)]] });
  }
}