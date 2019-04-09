import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quarter'
})
export class QuarterPipe implements PipeTransform {
  transform(value: Date): string {
    return `${this.getQuarter(value)} кв.`;
  }

  getQuarter(value: Date): string {
    const year = value.getFullYear();
    // Jan-Mar
    if (value >= new Date(year, 0, 1) && value <= new Date(year, 2, 31)) {
      return 'I';
    }
    // Apr-Jun
    if (value >= new Date(year, 3, 1) && value <= new Date(year, 5, 30)) {
      return 'II';
    }
    // Jul-Sep
    if (value >= new Date(year, 6, 1) && value <= new Date(year, 8, 30)) {
      return 'III';
    }
    return 'IV';
  }
}
