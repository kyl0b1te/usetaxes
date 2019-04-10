import { Pipe, PipeTransform } from '@angular/core';
import { QuarterService } from './quarter.service';

@Pipe({
  name: 'quarter'
})
export class QuarterPipe implements PipeTransform {

  constructor(private quaService: QuarterService) { }

  transform(value: Date): string {
    return `${this.quaService.getQuarter(value)} кв.`;
  }
}
