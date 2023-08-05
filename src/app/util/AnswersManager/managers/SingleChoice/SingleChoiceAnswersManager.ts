import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export class SingleChoiceAnswersManager {
  private readonly fb: FormBuilder;
  form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>

  private readonly maximumAmountOfAnswers = 10;

  private readonly minimumAmountOfWrongAnswers = 1;

  /**
   * Creates a new instance of the class. 
   * @param fb an instance of a FormBuilder
   * @param form the form for which this manager will be responsible.
   */
  constructor(fb: FormBuilder, form: FormArray<FormGroup<{
    value: FormControl<string | null>;
    correct: FormControl<boolean | null>;
  }>>) {
    this.fb = fb;
    this.form = form;
  }

  /**
   * Pushes a new wrong answer field to the form. The new field has all the needed validations.
   * @param value the initial value of the field, defaults to an empty string.
   */
  addField(value = ''): void {
    if (this.form.controls.length < this.maximumAmountOfAnswers) {
      this.form.push(
        this.fb.group(
          {
            value: [value, [Validators.required, Validators.maxLength(100)]],
            correct: [false],
          }
        )
      );
    }
  }

  /**
   * Returns the wrong answer field at the given index.
   * This method ignores the correct answer as a field; for example,
   * if the correct answer control is on index 0, then passing an index of 0
   * will retrieve the control on index 1 (which would be the first wrong answer)
   * @param index the index of the wrong answer.
   * @returns The control at the given index or ``null`` if the control does not exist.
   */
  getFieldAt(index: number) {
    const i = this.getActualIndex(index);

    if (i === -1) {
      return null;
    }

    return this.form.controls[i];
  }

  /**
   * Attempts to remove the wrong answer field at the given index. This method
   * ignores the correct answer as a field; for example,
   * if the correct answer control is on index 0, then passing an index of 0 will
   * make the method remove the control on index 1 (which is where the first wrong
   * answer control would be located at). This method silently fails if
   * there is only one wrong answer field when called.
   * @param index 
   * @throws if there is no wrong answer control at the given ``index``
   */
  removeFieldAt(index: number): void {
    if (this.canRemoveWrongAnswerFields) {
      const i = this.getActualIndex(index);
      
      if (i === -1) {
        throw new Error('You cannot remove the only wrong answer!');
      } else {
        this.form.removeAt(i);
      }
    }
  }

  /**
   * "Translates" the given ``index`` into its actual index in the form.
   * The "translation" is needed because all methods in this class, for convenience, interact with
   * the wrong answers as if the correct answer control did not exist.
   * This method allows you to map the requested ``index`` to its actual index in
   * the form.
   * 
   * **Examples:**
   * * If we have the correct answer control at index 0, then the methods will
   * treat the first wrong answer control as if it was on index ``0``. Thus, passing ``0``
   * to this method will return ``1`` (which is the actual index of this particular
   * wrong answer control).
   * * If the correct answer control is on index 1 and we are interested in
   * the third wrong answer control, then the methods will treat that wrong answer
   * to be on index ``2``. Thus, passing ``2`` to this method will return ``3``,
   * which is the index on which this particular wrong answer control can be found.
   * @param index the index of the wrong answer control to be converted to its actual index
   * @returns the actual index of the wrong answer control or ``-1`` if a wrong answer cannot be found at
   * the given ``index``.
   */
  getActualIndex(index: number) {
    let i = 0;
    return this.form.controls.findIndex((form) => {
      const isCorrect = form.controls.correct.value;
      if (isCorrect) {
        return false;
      }

      return index === i++;
    });
  }

  /**
   * Returns an array of all wrong answer controls.
   */
  get wrongAnswers() {
    return this.form.controls.filter(c => !c.controls.correct.value);
  }

  /**
   * Retrieves all validation errors for the wrong answer field at the
   * given ``index``. This method
   * ignores the correct answer as a field; for example,
   * if the correct answer control is on index 0, then passing
   * index 0 will retrieve the errors for the form control on index 1
   * (which is where the first wrong answer control would be located at)
   * @param index the index of the wrong answer.
   * @returns an object with validation errors or ``null`` if there are no validation errors.
   */
  getErrorsAt(index: number): ValidationErrors | null {
    const i = this.getActualIndex(index);    
    if (i === -1) {
      throw new Error(`Field at index ${index} does not exist!`);
    }

    return this.form.controls[i].controls.value.errors;
  }

  /**
   * Returns a boolean value indicating whether the user can remove
   * wrong answer fields (which is the case when there are more than one wrong answer
   * fields).
   */
  get canRemoveWrongAnswerFields(): boolean {
    return this.wrongAnswers.length > this.minimumAmountOfWrongAnswers;
  }

  get canAddWrongAnswerFields(): boolean {
    return this.form.length < this.maximumAmountOfAnswers;
  }
  
  /**
   * Returns the correct answer control.
   */
  get correctAnswer() {
    return this.form.controls.find(form => form.controls.correct.value)!;
  }
}