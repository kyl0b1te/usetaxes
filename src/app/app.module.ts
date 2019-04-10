import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import localeUk from '@angular/common/locales/uk';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

registerLocaleData(localeUk, 'uk');
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreditListComponent } from './credit-list/credit-list.component';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreditListItemComponent } from './credit-list/credit-list-item/credit-list-item.component';
import { CreditListFilterComponent } from './header/credit-list-filter/credit-list-filter.component';
import { EditCreditComponent } from './credit-list/edit-credit/edit-credit.component';

import { AmountPipe } from './shared/amount.pipe';

import { appReducer } from './store/app.reducer';
import { QuarterService } from './shared/quarter.service';

@NgModule({
  declarations: [
    AppComponent,
    CreditListComponent,
    HeaderComponent,
    CheckoutComponent,
    CreditListItemComponent,
    CreditListFilterComponent,
    AmountPipe,
    EditCreditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMyDatePickerModule.forRoot(),
    StoreModule.forRoot({ credits: appReducer })
  ],
  providers: [
    QuarterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
