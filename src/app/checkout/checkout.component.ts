import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CreditModel } from '../shared/credit.model';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  creditsSubscription: Subscription;
  credits = {};

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
    for (const credit of credits) {
      const quarter = credit.quarter;
      if (!this.credits[quarter]) {
        this.credits[quarter] = [];
      }
      this.credits[quarter].push(credit);
    }
  }

  ngOnDestroy() {
    this.creditsSubscription.unsubscribe();
  }

}
