import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { HomeComponent } from './shared/home/home.component';
import { UsAuthenticationComponent } from './shared/us-authentication/us-authentication.component';
import { SeAuthenticationComponent } from './shared/se-authentication/se-authentication.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { userAuthGuard } from './_auth/user-auth.guard';
import { sellerAuthGuard } from './_auth/seller-auth.guard';
import { authGuard } from './_auth/auth.guard';
import { ProductDetailsComponent } from './shared/product-details/product-details.component';


const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {
    path:'', component:ShellComponent, canActivate:[authGuard],
    children:[
      {path:'home', component:HomeComponent},
      {path:'usAuthentication', component:UsAuthenticationComponent},
      {path:'seAuthentication', component:SeAuthenticationComponent},
      {path:'productDetails/:productid', component:ProductDetailsComponent},
      {
        path:'user',
        loadChildren: ()=> import('./modules/user/user.module').then((m)=>m.UserModule),
        canActivate:[userAuthGuard]
      },
      {
        path:'seller',
        loadChildren: ()=> import('./modules/seller/seller.module').then((m)=>m.SellerModule),
        canActivate:[sellerAuthGuard]
      }
    ]
  },
  {path:'**', component:PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
