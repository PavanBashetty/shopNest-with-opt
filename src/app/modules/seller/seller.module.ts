import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
    {path:'sellerHome', component:SellerHomeComponent},
    {path:'sellerAddProduct', component:SellerAddProductComponent},
    {path:'sellerProfile', component:SellerProfileComponent}
]

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [
      SellerProfileComponent
    ]
  })
export class SellerModule{ }