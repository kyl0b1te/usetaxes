import { Component, OnInit } from '@angular/core';
import { CreditModel } from './credit.model';
import { AmountModel } from '../shared/amount.model';
import { CreditService } from './credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {
  credits: CreditModel[];

  constructor(private creditService: CreditService) { }

  ngOnInit() {
    this.credits = this.creditService.getCredits();
  }

}
