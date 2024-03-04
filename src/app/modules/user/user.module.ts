import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProductDetailsComponent } from 'src/app/shared/product-details/product-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path:'userHome',
        children:[
            {
                path:'',
                pathMatch:'full',
                component:UserHomeComponent
            },
            {
                path:'productDetail/:productid',
                component:ProductDetailsComponent
            }
        ]
    },
    {path:'userCart', component:CartPageComponent},
    {path:'userCheckout', component:CheckoutComponent},
    {path:'userOrderlist', component:OrderListComponent},
    {path:'userProfile', component:UserProfileComponent}
];

@NgModule({
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [
      UserProfileComponent
    ]
  })
export class UserModule{ }