import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

import { CreditModel } from '../../shared/credit.model';

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

  constructor(private formBuilder: FormBuilder) { }

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
      national: [
        this.credit ? this.credit.national.amount : null,
        [Validators.required, amountValidator]
      ],
    });
  }

  onCancelClicked() {
    this.onCancel.emit(true);
  }

  onSubmitClicked() {
    const values = this.creditForm.value;
    const credit = new CreditModel(
      new Date(values.date.jsdate),
      +values.national
    );
    this.onSubmit.emit(credit);
    this.creditForm.reset();
  }
}
