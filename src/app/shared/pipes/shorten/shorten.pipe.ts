import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true,
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, maxLength?: number): string {
    // return null;
    return '';
  }

}
