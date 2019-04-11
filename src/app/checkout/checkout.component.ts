import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CreditModel } from '../shared/credit.model';
import * as fromApp from '../store/app.reducer';
import { AmountModel } from '../shared/amount.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  creditsSubscription: Subscription;
  credits = {};

  totalCredit = new AmountModel(0, 'UAH');
  totalTax = new AmountModel(0, 'UAH');

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.creditsSubscription = this.store.select('credits').subscribe((state: fromApp.State) => {
      this.credits = {};
      this.groupByQuarter(state.credits);
    });
  }

  groupByQuarter(credits: CreditModel[]) {
    this.totalCredit.amount = 0;
    this.totalTax.amount = 0;
    for (const credit of credits) {
      const quarter = credit.quarter;
      if (!this.credits[quarter]) {
        this.credits[quarter] = [];
      }
      this.credits[quarter].push(credit);
      this.totalCredit.amount += credit.national.amount;
    }
    this.totalTax.amount = this.totalCredit.amount * 0.05;
  }

  ngOnDestroy() {
    this.creditsSubscription.unsubscribe();
  }

}
