import { Pipe, PipeTransform } from '@angular/core';
import { toThaiDate } from './date.util';

@Pipe({
  name: 'thaiDate'
})

export class ThaiDatePipe implements PipeTransform {
  transform(value: Date | string |number): string {
    return toThaiDate(value);
  }

}
