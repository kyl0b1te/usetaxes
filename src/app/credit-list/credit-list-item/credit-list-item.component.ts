import { Component, OnInit, Input } from '@angular/core';
import { CreditModel } from '../credit.model';

@Component({
  selector: 'app-credit-list-item',
  templateUrl: './credit-list-item.component.html',
  styleUrls: ['./credit-list-item.component.scss']
})
export class CreditListItemComponent implements OnInit {
  @Input() credit: CreditModel;

  constructor() { }

  ngOnInit() {
  }

}
