import { AmountModel } from '../shared/amount.model';
import { QuarterService } from '../shared/quarter.service';

export class CreditModel {
  public national: AmountModel;
  public quarter: string

  constructor(public date: Date, national: number) {
    this.national = new AmountModel(national, 'UAH');
    this.quarter = QuarterService.getQuarter(date);
  }
}
