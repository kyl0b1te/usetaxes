import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConversionService } from '../../conversion.service';
import { CurrencyModel } from 'src/app/shared/currency.model';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {
  @Output() onCurrencySelect = new EventEmitter<string>();
  @Input() selectedCurrency: string;

  isInSelectionMode = false;
  currencies: CurrencyModel[];

  constructor() { }

  ngOnInit() {
    this.currencies = ConversionService.getAvailableCurrencies();
  }

  getCurrencies() {
    return this.currencies;
  }

  getPresetCurrencies() {
    let preset = this.currencies.slice(0, 3);
    if (!preset.find(currency => currency.code === this.selectedCurrency)) {
      preset[2] = ConversionService.getCurrencyByCode(this.selectedCurrency);
    }
    return preset;
  }

  onSelect(currency: string) {
    this.selectedCurrency = currency;
    this.onCurrencySelect.emit(currency);
    this.isInSelectionMode = false;
  }
}
