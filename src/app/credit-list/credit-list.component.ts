import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CreditModel } from '../shared/credit.model';
import * as fromApp from '../store/app.reducer';
import * as AppActions from '../store/app.actions';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {
  creditsState: Observable<{credits: CreditModel[]}>;
  addCreditMode = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.creditsState = this.store.select('credits');
  }

  onAddCreditModeToggle() {
    this.addCreditMode = !this.addCreditMode;
  }

  onAddCreditSubmit(credit: CreditModel) {
    this.store.dispatch(new AppActions.AddCredit(credit));
    this.addCreditMode = false;
  }

}
