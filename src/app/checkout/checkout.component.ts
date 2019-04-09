import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { CreditModel } from '../shared/credit.model';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  creditsSubscription: Subscription;
  credits: CreditModel[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.creditsSubscription = this.store.select('credits').subscribe(credits => {
      // todo :
      console.log(credits);
    });
  }

  ngOnDestroy() {
    this.creditsSubscription.unsubscribe();
  }

}
