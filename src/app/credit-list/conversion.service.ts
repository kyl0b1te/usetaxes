import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CurrencyRateModel } from './currency-rate.model';
import { Observable } from 'rxjs';
import { CurrencyModel } from '../shared/currency.model';
import { DateService } from '../shared/date.service';

@Injectable()
export class ConversionService {

  private static currencies = [
    new CurrencyModel('UAH', '₴', 'Гривня'),
    new CurrencyModel('EUR', '€', 'Євро'),
    new CurrencyModel('USD', '$', 'Долар США'),
    new CurrencyModel('CAD', '$', 'Канадський долар'),
    new CurrencyModel('PLN', 'zł', 'Злотий'),
    // new CurrencyModel('CHF', 'CHF', 'Швейцарський франк'),
    new CurrencyModel('GBP', '£', 'Фунт стерлінгів'),
  ];

  constructor(
    private http: HttpClient,
    private dateService: DateService
  ) { }

  static getCurrencyByCode(code: string): CurrencyModel {
    return ConversionService.currencies.find((currency: CurrencyModel): boolean => currency.code === code);
  }

  static getAvailableCurrencies(): CurrencyModel[] {
    return ConversionService.currencies;
  }

  getConversionRate(
    date: Date,
    currency: string
  ): Observable<CurrencyRateModel[]> {
    const url = this.getRequestURL(date, currency);
    return this.http.get<CurrencyRateModel[]>(url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  private getRequestURL(date: Date, currency: string) {
    // https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20190410&json
    return [
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?',
      `valcode=${currency}&`,
      `date=${this.getRequestDate(date)}&`,
      'json'
    ].join('');
  }

  private getRequestDate(date: Date): string {
    const { year, month, day } = this.dateService.getFormattedDate(date);
    return `${year}${month}${day}`;
  }
}
