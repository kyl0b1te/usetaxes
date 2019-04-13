import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localeUk from '@angular/common/locales/uk';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

registerLocaleData(localeUk, 'uk');
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreditListComponent } from './credit-list/credit-list.component';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreditListItemComponent } from './credit-list/credit-list-item/credit-list-item.component';
import { EditCreditComponent } from './credit-list/edit-credit/edit-credit.component';

import { AmountPipe } from './shared/amount.pipe';

import { appReducer } from './store/app.reducer';
import { QuarterService } from './shared/quarter.service';
import { ConversionService } from './credit-list/conversion.service';
import { CurrencySelectorComponent } from './credit-list/edit-credit/currency-selector/currency-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditListComponent,
    HeaderComponent,
    CheckoutComponent,
    CreditListItemComponent,
    AmountPipe,
    EditCreditComponent,
    CurrencySelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMyDatePickerModule.forRoot(),
    StoreModule.forRoot({ credits: appReducer })
  ],
  providers: [
    QuarterService,
    ConversionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
