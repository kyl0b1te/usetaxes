import { Pipe, PipeTransform } from '@angular/core';
import { AmountModel } from './amount.model';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'amount',
  pure: false
})
export class AmountPipe extends CurrencyPipe implements PipeTransform {
  transform(value: AmountModel): string {
    if (!value) {
      return '';
    }
    return super.transform(value.amount, value.currency, 'symbol', '.2-2', 'uk');
  }
}
