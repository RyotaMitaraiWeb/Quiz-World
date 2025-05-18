import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

type errorMessages = Record<string, string>;
@Pipe({
  name: 'singleInputError',
})
export class SingleInputErrorPipe implements PipeTransform {

  /**
     * Provides the first error from a passed ``ValidationErrors`` object
     * (used in Angular's ``ReactiveFormsModule``) so that it can be displayed
     * in a ``<mat-error>`` (or a different selector of your choice).
     *
     * In order for this to work, you need to provide two things:
     * - the errors for the respective control (typically a field)
     * - an object containing the error messages to be displayed
     *
     * An additional requirement is that the error messages' properties must
     * have the same name as the errors object's properties, otherwise, they will
     * be ignored (for example, a message for ``minLength`` will be ignored,
     * but ``minlength`` won't be).
     *
     * An empty string is returned if one of the following is true:
     * - there are no validation errors (null)
     * - no error is found in the object (typically due to differing property names or
     * hidden requirements)
   */
  transform(validationErrors: ValidationErrors | null, errorMessages: errorMessages): string {
    if (!validationErrors) {
      return '';
    }

    return this.findFirstError(validationErrors, errorMessages);
  }

  private findFirstError(errors: ValidationErrors, errorMessages: errorMessages) {
    const errorKeys = Object.keys(errors);

    for (const error of errorKeys) {
      const errorMessage = errorMessages[error];
      if (errorMessage) {
        return errorMessage;
      }
    }

    return '';
  }
}
