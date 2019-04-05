import { AmountModel } from '../shared/amount.model';

export class CreditModel {
  constructor(
    public date: Date,
    public nationalAmount: AmountModel,
    public foreignAmount: AmountModel
  ) { }
}
