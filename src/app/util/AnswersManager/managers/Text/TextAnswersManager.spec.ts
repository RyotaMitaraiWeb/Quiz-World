import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {TextAnswersManager } from './TextAnswersManager';


describe('TextAnswersManager', () => {
  let fb = new FormBuilder();
  let form = fb.array([
    fb.group(
      {
        value: ['', Validators.required],
        correct: [true]
      })
  ]);

  let manager = new TextAnswersManager(fb, form);
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

    manager = new TextAnswersManager(fb, form);
  });

  describe('addField', () => {
    it('Adds a field successfully', () => {
      manager.addField('abcde');
      expect(form.controls[1].value.value).toBe('abcde');
    });

    it('Does not add a field if the form is at maximum capacity', () => {
      for (let i = 0; i < 14; i++) {
        form.push(
          fb.group({
            correct: [true],
            value: 'abcde'
          })
        );
      }      

      manager.addField('a');
      expect(form.length).toBe(15);
    });
  });

  describe('removeFieldAt', () => {
    it('Removes fields successfully', () => {
      for (let i = 0; i < 13; i++) {
        form.push(fb.group(
          {
            value: i + '',
            correct: [true],
          }
        ));
      }

      console.log(form.length);
      
      manager.removeFieldAt(1);
      expect(form.length).toBe(13);

      const answer = form.controls[2];
      expect(answer.controls.value.value).toBe('2');
    });

    it('Throws an error if it cannot find the field', () => {
      expect(() => manager.removeFieldAt(-1)).toThrowError('Field at index -1 could not be found!');
    });

    it('Silently fails if there are too few answers to delete the field', () => {
      manager.removeFieldAt(0);
      expect(form.length).toBe(1);
    });
  });

  describe('getErrorsAt', () => {
    it('Gets validation errors successfully', () => {
      form.controls[0].controls.value.setErrors({ required: 'this field is required' });
  
      expect(manager.getErrorsAt(0)).toEqual({ required: 'this field is required'});
      form.controls[0].controls.value.setErrors(null);

      expect(manager.getErrorsAt(0)).toBeNull();
    });

    it('Throws an error if the field does not exist', () => {
      expect(() => manager.getErrorsAt(-1)).toThrowError('Cannot retrieve errors at index -1!');
    })
  });
});