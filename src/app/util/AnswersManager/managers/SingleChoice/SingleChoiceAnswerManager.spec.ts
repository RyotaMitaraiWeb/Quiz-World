import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SingleChoiceAnswersManager } from './SingleChoiceAnswersManager';


describe('SingleChoiceAnswersManager', () => {
  let fb = new FormBuilder();
  let form = fb.array([
    fb.group(
      {
        value: ['', Validators.required],
        correct: [true]
      })
  ]);

  let manager = new SingleChoiceAnswersManager(fb, form);
  beforeEach(() => {
    fb = new FormBuilder();
    form = fb.array([
      fb.group(
        {
          value: ['', Validators.required],
          correct: [true]
        }
      )
    ]);

    manager = new SingleChoiceAnswersManager(fb, form);
  });

  describe('addField', () => {
    it('Adds a wrong answer field successfully', () => {
      manager.addField('a');

      expect(form.controls[1].controls.value.value).toBe('a');
      expect(form.controls[1].controls.correct.value).toBeFalse();
    });

    it('Does not add more answers if there are 10 answers', () => {
      for (let i = 0; i < 9; i++) {
        form.controls.push(fb.group(
          {
            value: 'a',
            correct: false as boolean,
          }
        ));
      }

      manager.addField('a');
      expect(form.controls.length).toBe(10);
    });
  });

  describe('removeField', () => {
    it('Removes a field at a given index successfully', () => {
      for (let i = 0; i < 9; i++) {
        form.controls.push(fb.group(
          {
            value: i + '',
            correct: false as boolean,
          }
        ));
      }

      manager.removeFieldAt(1);

      expect(form.controls[2].controls.value.value).toBe('2');

      manager.removeFieldAt(3);

    });

    it('Does not remove a field if there is only one wrong answer', () => {
      form.controls.push(fb.group(
        {
          value: 'a',
          correct: [false],
        }));

      manager.removeFieldAt(0);

      expect(manager.getFieldAt(0)).not.toBeNull();
    });

    it('Throws an error if there is no field at the given index', () => {
      form.controls.push(fb.group(
        {
          value: 'a',
          correct: [false],
        }));

      form.controls.push(fb.group(
        {
          value: 'a',
          correct: [false],
        }));


      expect(() => manager.removeFieldAt(3)).toThrowError('You cannot remove the only wrong answer!');
    });
  });

  describe('getErrorsAt', () => {
    it('Gets validation errors successfully', () => {
      form.controls.push(fb.group(
        {
          value: 'a',
          correct: [false],
        }));

      form.controls[1].controls.value.setErrors({ required: 'field is required'});

      const errors = manager.getErrorsAt(0);

      expect(errors).not.toBeNull();

      form.controls[1].controls.value.setErrors(null);

      const noErrors = manager.getErrorsAt(0);

      expect(noErrors).toBeNull();
    });

    it('Throws an error if the field does not exist', () => {
      expect(() => manager.getErrorsAt(-1)).toThrowError('Field at index -1 does not exist!');
    });
  });
});