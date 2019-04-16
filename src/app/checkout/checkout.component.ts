import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CreditModel } from '../shared/credit.model';
import * as fromApp from '../store/app.reducer';
import { AmountModel } from '../shared/amount.model';
import { DateService } from '../shared/date.service';

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
    private store: Store<fromApp.AppState>,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.creditsSubscription = this.store.select('credits').subscribe((state: fromApp.State) => {
      this.credits = {};
      this.total = state.total;
      this.groupByDate(state.credits);
    });
  }

  private groupByDate(credits: CreditModel[]) {
    const unsorted = {};
    for (const credit of credits) {
      const creditDate = this.getCreditDate(credit.date);
      if (!unsorted[creditDate]) {
        unsorted[creditDate] = [];
      }
      unsorted[creditDate].push(credit);
    }
    Object.keys(unsorted).sort().map((key: string) => {
      this.credits[key] = unsorted[key];
    });
  }

  private getCreditDate(date: Date): string {
    const { year, month, day } = this.dateService.getFormattedDate(date);
    return `${day}.${month}.${year}`;
  }

  ngOnDestroy() {
    this.creditsSubscription.unsubscribe();
  }
}
