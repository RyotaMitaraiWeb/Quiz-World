import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe truncates a string to a specific length and appends an ellipsis 
 * if the string's length is higher than the specified or default max length.
 * The default max length is 50 characters.
 * If the string is shorter than the max length, the pipe returns 
 * the same string unmodified.
 */
@Pipe({
  name: 'shorten',
  standalone: true,
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, maxLength = 50): string {
    if (value.length <= maxLength) {
      return value;
    }

    return value.slice(0, maxLength) + '...';
  }

}
