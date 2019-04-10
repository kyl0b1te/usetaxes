import { AmountModel } from '../shared/amount.model';
import { QuarterService } from '../shared/quarter.service';

export class CreditModel {
  public national: AmountModel;
  public quarter: string;

  public foreign: AmountModel = null;

  constructor(
    public date: Date,
    national: number,
    foreign?: AmountModel
  ) {
    this.national = new AmountModel(national, 'UAH');
    this.quarter = QuarterService.getQuarter(date);
    if (foreign) {
      this.foreign = foreign;
    }
  }
}
