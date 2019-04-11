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

  total: { credit: AmountModel, tax: AmountModel, profit: AmountModel };

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.creditsSubscription = this.store.select('credits').subscribe((state: fromApp.State) => {
      this.credits = {};
      this.total = state.total;
      this.groupByQuarter(state.credits);
    });
  }

  groupByQuarter(credits: CreditModel[]) {
    for (const credit of credits) {
      const creditDate = this.getCreditDate(credit.date);
      if (!this.credits[creditDate]) {
        this.credits[creditDate] = [];
      }
      this.credits[creditDate].push(credit);
    }
  }

  private getCreditDate(date: Date): string {
    return date.toJSON().split('T')[0].split('-').reverse().join('.');
  }

  ngOnDestroy() {
    this.creditsSubscription.unsubscribe();
  }
}
