import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

import { CreditModel } from '../../shared/credit.model';
import { AmountModel } from 'src/app/shared/amount.model';
import { ConversionService } from '../conversion.service';

@Component({
  selector: 'app-edit-credit',
  templateUrl: './edit-credit.component.html',
  styleUrls: ['./edit-credit.component.scss']
})
export class EditCreditComponent implements OnInit {
  @Input() credit: CreditModel;

  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<CreditModel>();

  dateOptions: INgxMyDpOptions = { dateFormat: 'dd.mm.yyyy' };
  creditForm: FormGroup;

  defaultCurrency = 'UAH';

  constructor(
    private formBuilder: FormBuilder,
    private conService: ConversionService
  ) { }

  ngOnInit() {
    this.initCreditForm();
  }

  initCreditForm() {
    const amountValidator = Validators.pattern('^[1-9]{1}[0-9]*');
    this.creditForm = this.formBuilder.group({
      date: [
        this.credit ? { jsdate: this.credit.date } : null,
        Validators.required
      ],
      amount: [
        this.credit ? this.credit.national.amount : null,
        [Validators.required, amountValidator]
      ],
      currency: [ this.defaultCurrency ]
    });
  }

  getSupportedCurrencies() {
    return ['UAH', 'EUR', 'USD', 'CAD', 'CHF', 'PLN', 'CHF', 'GBP'];
  }

  getForeignAmount(amount: number, currency: string) {
    if (currency !== this.defaultCurrency) {
      return new AmountModel(+amount, currency);
    }
    return null;
  }

  onCancelClicked() {
    this.onCancel.emit(true);
  }

  onSubmitClicked() {
    const { amount, currency, date } = this.creditForm.value;
    const foreign = this.getForeignAmount(+amount, currency);

    if (foreign) {
      this.conService.getConversionRate(date.jsdate, currency).subscribe((rates) => {
        const converted = Math.round(amount * rates[0].rate * 100) / 100;
        console.log(converted);
        this.onSubmit.emit(
          new CreditModel(date.jsdate, converted, foreign)
        );
      });
    } else {
      this.onSubmit.emit(
        new CreditModel(date.jsdate, +amount)
      );
    }
    this.creditForm.reset();
  }
}
