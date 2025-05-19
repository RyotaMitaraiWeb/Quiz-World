import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MultipleChoiceAnswersManager } from './MultipleChoiceAnswersManager';


describe('MultipleChoiceAnswersManager', () => {
  let fb = new FormBuilder();
  let form = fb.array([
    fb.group(
      {
        value: ['', Validators.required],
        correct: [true]
      })
  ]);

  let manager = new MultipleChoiceAnswersManager(fb, form);
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

    manager = new MultipleChoiceAnswersManager(fb, form);
  });

  describe('addField', () => {
    it('Adds a field successfully', () => {
      manager.addField('c', true);
      expect(form.length).toBe(2);

      expect(manager.getAnswersOfCorrectness(true).length).toBe(2);

      manager.addField('w', false);
      expect(form.length).toBe(3);
    });

    it('Does not add a field if the form is at maximum capacity', () => {
      for (let i = 0; i < 4; i++) {
        form.push(fb.group(
          {
            value: i + '',
            correct: [true],
          }
        ));

        form.push(fb.group(
          {
            value: 'wrong',
            correct: [false],
          }
        ));
      }

      form.push(fb.group(
        {
          value: 'wrong',
          correct: [false],
        }
      ));
      manager.addField('a', true);
      manager.addField('b', false);
      expect(form.length).toBe(10);
    });
  });

  describe('removeFieldAt', () => {
    it('Removes fields successfully', () => {
      for (let i = 0; i < 4; i++) {
        form.push(fb.group(
          {
            value: i + '',
            correct: [true],
          }
        ));

        form.push(fb.group(
          {
            value: i + '',
            correct: [false],
          }
        ));
      }

      manager.removeFieldAt(1, true);
      expect(form.length).toBe(8);

      const correctAnswer = manager.getFieldAtIndex(1, true);
      expect(correctAnswer?.value.value).toBe('1');

      manager.removeFieldAt(2, false);
      expect(form.length).toBe(7);

      const wrongAnswer = manager.getFieldAtIndex(2, false);
      expect(wrongAnswer?.value.value).toBe('3');
    });

    it('Throws an error if it cannot find the field', () => {
      for (let i = 0; i < 4; i++) {
        form.push(fb.group(
          {
            value: i + '',
            correct: [true],
          }
        ));

        form.push(fb.group(
          {
            value: i + '',
            correct: [false],
          }
        ));
      }

      expect(() => manager.removeFieldAt(-1, false)).toThrowError('Field at index -1 could not be found!');
      expect(() => manager.removeFieldAt(-1, true)).toThrowError('Field at index -1 could not be found!');
    });

    it('Silently fails if there are too few correct answers to delete the field', () => {
      form.push(
        fb.group({
          value: ['a'],
          correct: [true],
        })
      )
      manager.removeFieldAt(0, true);
      expect(form.length).toBe(2);
    });

    it('Removes a wrong answer even if it is the only one', () => {
      form.push(fb.group(
        {
          value: 'wrong',
          correct: [false],
        }
      ));

      form.push(fb.group(
        {
          value: 'c',
          correct: [true],
        }
      ));

      expect(form.length).withContext('The wrong and correct answers should have been added to the form').toBe(3);

      manager.removeFieldAt(0, false);
      expect(form.length).toBe(2);
    });

    it('Does not remove a wrong answer if it would make the question have less than two answers', () => {
      form.push(fb.group(
        {
          value: 'wrong',
          correct: [false],
        }
      ));

      expect(form.length).withContext('The wrong answer should have been added to the form').toBe(2);

      manager.removeFieldAt(0, false);
      expect(form.length).toBe(2);
    });
  });

  describe('getErrorsAt', () => {
    it('Gets validation errors successfully', () => {
      for (let i = 0; i < 4; i++) {
        form.push(fb.group(
          {
            value: i + '',
            correct: [true],
          }
        ));

        form.push(fb.group(
          {
            value: 'wrong',
            correct: [false],
          }
        ));
      }

      form.controls[1].controls.value.setErrors({ required: 'this field is required' });
      form.controls[2].controls.value.setErrors({ required: 'this field is required' });

      expect(manager.getErrorsAt(1, true)).toEqual({ required: 'this field is required' });
      expect(manager.getErrorsAt(0, false)).toEqual({ required: 'this field is required' });

      expect(manager.getErrorsAt(2, true)).toBeNull();
    });

    it('Throws an error if the field does not exist', () => {
      expect(() => manager.getErrorsAt(-1, true)).toThrowError('Cannot retrieve errors at index -1!');
      expect(() => manager.getErrorsAt(-1, false)).toThrowError('Cannot retrieve errors at index -1!');
    })
  });
});