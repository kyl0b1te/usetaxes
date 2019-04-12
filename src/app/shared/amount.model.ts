import { CurrencyModel } from './currency.model';
import { ConversionService } from '../credit-list/conversion.service';

export class AmountModel {
  public currency: CurrencyModel;

  constructor(
    public amount: number,
    currencyCode: string
  ) {
    this.currency = ConversionService.getCurrencyByCode(currencyCode);
  }
}
