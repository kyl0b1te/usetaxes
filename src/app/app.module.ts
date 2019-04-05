import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

registerLocaleData(localeUk, 'uk')

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditListComponent } from './credit-list/credit-list.component';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreditListItemComponent } from './credit-list/credit-list-item/credit-list-item.component';
import { CreditListFilterComponent } from './header/credit-list-filter/credit-list-filter.component';
import { AmountPipe } from './shared/amount.pipe';
import { CreditService } from './credit-list/credit.service';

@NgModule({
  declarations: [
    AppComponent,
    CreditListComponent,
    HeaderComponent,
    CheckoutComponent,
    CreditListItemComponent,
    CreditListFilterComponent,
    AmountPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CreditService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
