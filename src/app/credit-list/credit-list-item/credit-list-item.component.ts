import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Store } from '@ngrx/store';

import { CreditModel } from '../../shared/credit.model';

import * as AppActions from '../../store/app.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-credit-list-item',
  templateUrl: './credit-list-item.component.html',
  styleUrls: ['./credit-list-item.component.scss']
})
export class CreditListItemComponent implements OnInit {
  @Input() credit: CreditModel;
  @Input() index: number;

  editCreditMode = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onDeleteClicked() {
    this.store.dispatch(new AppActions.DeleteCredit(this.index));
  }

  onEditClicked(credit: CreditModel) {
    this.store.dispatch(new AppActions.EditCredit(
      { index: this.index, credit }
    ));
    this.editCreditMode = false;
  }

  onEditCreditModeToggle() {
    this.editCreditMode = !this.editCreditMode;
  }
}
