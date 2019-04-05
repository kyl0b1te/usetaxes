import { CreditModel } from './credit.model';
import { AmountModel } from '../shared/amount.model';

export class CreditService {

  credits = [
    new CreditModel(
      new Date(), new AmountModel(12745, 'UAH'), new AmountModel(1000, 'USD')
    ),
    new CreditModel(
      new Date(), new AmountModel(12745, 'UAH'), new AmountModel(1000, 'USD')
    ),
    new CreditModel(
      new Date(), new AmountModel(12745, 'UAH'), new AmountModel(1000, 'USD')
    )
  ];

  getCredits(): CreditModel[] {
    return this.credits;
  }
}
