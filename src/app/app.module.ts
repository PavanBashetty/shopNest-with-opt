import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShellComponent } from './shared/shell/shell.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './shared/home/home.component';
import { UsAuthenticationComponent } from './shared/us-authentication/us-authentication.component';
import { SeAuthenticationComponent } from './shared/se-authentication/se-authentication.component';
import { UserHomeComponent } from './modules/user/user-home/user-home.component';
import { CartPageComponent } from './modules/user/cart-page/cart-page.component';
import { CheckoutComponent } from './modules/user/checkout/checkout.component';
import { OrderListComponent } from './modules/user/order-list/order-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { SellerHomeComponent } from './modules/seller/seller-home/seller-home.component';
import { SellerAddProductComponent } from './modules/seller/seller-add-product/seller-add-product.component';
import { DynamicAdComponent } from './shared/home/dynamic-ad/dynamic-ad.component';
import { SummerSaleComponent } from './shared/home/dynamic-ad/summer-sale/summer-sale.component';
import { ApparelDiscountComponent } from './shared/home/dynamic-ad/apparel-discount/apparel-discount.component';
import { ProductDetailsComponent } from './shared/product-details/product-details.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './_store/userStore/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UsAuthenticationComponent,
    SeAuthenticationComponent,
    UserHomeComponent,
    CartPageComponent,
    CheckoutComponent,
    OrderListComponent,
    PageNotFoundComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    DynamicAdComponent,
    SummerSaleComponent,
    ApparelDiscountComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      userInfo: userReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
