import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CurrencyRateModel } from './currency-rate.model';
import { Subscription, Observable } from 'rxjs';

@Injectable()
export class ConversionService {
  constructor(private http: HttpClient) { }

  getConversionRate(date: Date, currency: string): Observable<CurrencyRateModel[]> {
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
      `date=${date.toJSON().split('T')[0].replace(/-/g, '')}&`,
      'json'
    ].join('');
  }
}
