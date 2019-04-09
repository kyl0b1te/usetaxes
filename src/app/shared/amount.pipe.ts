import { Pipe, PipeTransform } from '@angular/core';
import { AmountModel } from './amount.model';
import { CurrencyPipe } from '@angular/common';

@Pipe({ name: 'amount' })
export class AmountPipe extends CurrencyPipe implements PipeTransform {
  transform(value: AmountModel): string {
    return super.transform(value.amount, value.currency, 'symbol', '.2-2', 'uk');
  }
}
