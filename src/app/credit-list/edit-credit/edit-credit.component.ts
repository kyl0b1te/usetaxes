import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDate } from 'ngx-mydatepicker';

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

  dateOptions: INgxMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    minYear: 2017,
    maxYear: new Date().getFullYear(),
    showTodayBtn: false,
    disableSince: EditCreditComponent.getDisableSinceDate(),
    dayLabels: {
      su: 'Нд', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
    },
    monthLabels: {
      1: 'Січ', 2: 'Лют', 3: 'Берез', 4: 'Квіт',
      5: 'Трав', 6: 'Черв', 7: 'Лип', 8: 'Серп',
      9: 'Верес', 10: 'Жовт', 11: 'Листоп', 12: 'Груд'
    }
  };
  creditForm: FormGroup;

  defaultCurrency = 'UAH';
  selectedCurrency: string;

  constructor(
    private formBuilder: FormBuilder,
    private conService: ConversionService
  ) { }

  ngOnInit() {
    this.initCreditForm();
  }

  initCreditForm() {
    const amountValidator = Validators.pattern('^[1-9]{1}[0-9\.\,]*');
    const { date, amount, currency } = this.getCreditData();
    this.creditForm = this.formBuilder.group({
      date: [ date ? { jsdate: date } : null, Validators.required ],
      amount: [ amount, [Validators.required, amountValidator] ]
    });
    this.selectedCurrency = currency;
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
    const { amount, date } = this.creditForm.value;

    if (this.selectedCurrency === this.defaultCurrency) {
      return this.addNewCredit(date.jsdate, amount);
    }

    this.conService.getConversionRate(date.jsdate, this.selectedCurrency).subscribe((rates) => {
      this.addNewCredit(
        date.jsdate,
        Math.round(amount * rates[0].rate * 100) / 100,
        new AmountModel(+amount, this.selectedCurrency)
      );
    });
  }

  private static getDisableSinceDate(): IMyDate {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate() + 1
    };
  }

  private addNewCredit(date: Date, national: number, foreign?: AmountModel) {
    const credit = new CreditModel(date, +national, foreign);
    this.onSubmit.emit(credit);
    this.creditForm.reset();
  }

  private getCreditData(): { date: Date, amount: number, currency: string } {
    if (!this.credit) {
      return { date: null, amount: null, currency: this.defaultCurrency };
    }
    const { date, national, foreign } = this.credit;
    return {
      date,
      amount: foreign ? foreign.amount : national.amount,
      currency: foreign ? foreign.currency.code : national.currency.code,
    }
  }
}
