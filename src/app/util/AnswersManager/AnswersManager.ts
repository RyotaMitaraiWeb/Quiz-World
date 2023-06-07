import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export class AnswersManager {
  private readonly fb;
  private readonly _form;

  constructor(form: FormArray<FormGroup<{ answer: FormControl<string | null> }>>, fb: FormBuilder) {
    this._form = form;
    this.fb = fb;
  }

  get form() {
    return this._form;
  }

  addField(value = ''): void {    
    this.form.push(this.createNewControl(value));    
  }

  removeFieldAt(index: number): void {
    if (this.form.length <= 1) {
      throw new Error('You cannot delete the only remaining answer!');
    } else if (index < 0 || index >= this.form.length) {
      throw new Error('Field does not exist');
    }

    this.form.removeAt(index);
  }

  getErrorsAt(index: number): ValidationErrors | null {
    const controls = this.form.controls[index];
    if (!controls) {
      throw new Error('Field does not exist');
    }

    return controls.controls.answer.errors;
  }

  get hasMoreThanOneAnswer(): boolean {
    return this.form.length > 1;
  }

  private createNewControl(value = ''): FormGroup<{ answer: FormControl<string | null>; }> {
    return this.fb.group({ answer: [value, [Validators.required, Validators.maxLength(100)]] });
  }
}