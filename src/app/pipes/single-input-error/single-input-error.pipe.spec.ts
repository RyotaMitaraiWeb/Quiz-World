import { ValidationErrors } from '@angular/forms';
import { SingleInputErrorPipe } from './single-input-error.pipe';

const validationErrorMessages = {
  errorOne: 'error1',
  errorTwo: 'error2',
  errorThree: 'error3',
  errorFour: 'error4',
};

describe('SingleInputErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new SingleInputErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the first error successfully', () => {
    const errors: ValidationErrors = {
      errorOne: true,
      errorTwo: true,
      errorThree: true,
      errorFour: true,
    };

    const pipe = new SingleInputErrorPipe();
    expect(pipe.transform(errors, validationErrorMessages)).toBe('error1');
  });

  it('Ignores errors that do not exist in the validationMessages and messages that do not exist in validation errors', () => {
    const errors: ValidationErrors = {
      errorZero: true, // does not exist at all
      errorONE: true, // pipe is case-sensitive
      errorTwo: true,
      errorThree: true,
      errorFour: true,
    };

    const exampleValidationMessages = {
      errorMinusOne: 'error-1', // does not exist in validation errors
      ...validationErrorMessages,
    };

    const pipe = new SingleInputErrorPipe();
    expect(pipe.transform(errors, exampleValidationMessages)).toBe('error2');
  });

  it('Returns an empty string if there are no errors', () => {
    const pipe = new SingleInputErrorPipe();
    expect(pipe.transform(null, validationErrorMessages)).toBe('');
    expect(pipe.transform({}, validationErrorMessages)).toBe('');
  });

  it('Returns an empty string if there are no matches between errors and messages', () => {
    const pipe = new SingleInputErrorPipe();
    const errors = { required: true };

    expect(pipe.transform(errors, validationErrorMessages)).toBe('');
  });
});
