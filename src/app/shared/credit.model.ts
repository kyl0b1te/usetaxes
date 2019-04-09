import { AmountModel } from '../shared/amount.model';

export class CreditModel {
  public national: AmountModel;

  constructor(
    public date: Date,
    national: number
  ) {
    this.national = new AmountModel(national, 'UAH')
  }
}
