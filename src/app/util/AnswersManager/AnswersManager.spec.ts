import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswersManager } from './AnswersManager';

describe('AnswersManager', () => {
  const fb = new FormBuilder();
  let form: FormArray<FormGroup<{ answer: FormControl<string | null> }>>;
  let manager: AnswersManager;

  beforeEach(() => {
    form = fb.array([fb.group({ answer: ['', [Validators.required, Validators.maxLength(100)]] })]);
    manager = new AnswersManager(form, fb);
  });

  describe('addField', () => {
    it('adds an empty field successfully', () => {
      manager.addField();
      expect(form.length).toBe(2);
      expect(form.controls[0].controls.answer.value).toBe('');
      expect(form.controls[1].controls.answer.value).toBe('');
    });

    it('adds a field with pre-populated data successfully', () => {
      manager.addField('a');
      expect(form.length).toBe(2);
      expect(form.controls[0].controls.answer.value).toBe('');
      expect(form.controls[1].controls.answer.value).toBe('a');
    });

    it('Adding a new invalid field renders the form invalid', () => {
      form.controls[0].controls.answer.setValue('a');
      form.controls[0].controls.answer.markAsTouched();

      expect(form.valid).toBe(true);

      manager.addField();
      expect(form.invalid).toBe(true);
    });
  });

  describe('removeFieldAt', () => {
    it('Removes the field at the given index', () => {
      form.controls.push(fb.group({ answer: ['test', [Validators.required, Validators.maxLength(100)]] }));

      manager.removeFieldAt(0);
      expect(form.length).toBe(1);
      expect(form.controls[0].controls.answer.value).toBe('test');
    });

    it('Throws an error if the given field does not exist', () => {
      form.controls.push(fb.group({ answer: ['test', [Validators.required, Validators.maxLength(100)]] }));
      expect(() => manager.removeFieldAt(-1)).toThrowError('Field does not exist');
      expect(() => manager.removeFieldAt(2)).toThrowError('Field does not exist');
    });

    it('Throws an error if there is only one answer in the form', () => {
      expect(() => manager.removeFieldAt(0)).toThrowError('You cannot delete the only remaining answer!');
    });

    it('One answer error takes precedence over non-existant field', () => {
      expect(() => manager.removeFieldAt(-1)).toThrowError('You cannot delete the only remaining answer!');
    });
  });

  describe('hasMoreThanOneAnswer getter', () => {
    it('Returns true if the form has more than one answer', () => {
      form.controls.push(fb.group({ answer: ['test', [Validators.required, Validators.maxLength(100)]] }));
      expect(manager.hasMoreThanOneAnswer).toBeTrue();
    });

    it('Returns false if the form has only one answer', () => {
      expect(manager.hasMoreThanOneAnswer).toBeFalse();
    });
  });

  describe('getErrorsAt', () => {
    it('Gets a required error successfully', () => {
      form.controls[0].controls.answer.setValue('');
      form.controls[0].controls.answer.markAsTouched();

      const errors = manager.getErrorsAt(0);
      expect(errors).toEqual({ required: true });
    });

    it('Gets a maxLength error successfully', () => {
      form.controls[0].controls.answer.setValue('a'.repeat(500));
      form.controls[0].controls.answer.markAsTouched();

      const errors = manager.getErrorsAt(0);
      
      expect(errors).toEqual({maxlength: { requiredLength: 100, actualLength: 500 }});
    });

    it('Returns null if there are no validation errors', () => {
      form.controls[0].controls.answer.setValue('a');
      form.controls[0].controls.answer.markAsTouched();

      const errors = manager.getErrorsAt(0);
      expect(errors).toBeNull();
    });

    it('Throws an error if the field does not exist', () => {
      expect(() => manager.getErrorsAt(-1)).toThrowError('Field does not exist');
    });
  });
});