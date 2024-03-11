import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/_api/api.service';
import { product } from 'src/app/_interfaces/addProductData';
import { userSignUpData } from 'src/app/_interfaces/userCredentialsData';
import { UserServices } from 'src/app/_services/user.service';
import { updateUserData } from 'src/app/_store/userStore/user.actions';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {

  completeProductList!: product[]
  userId!:string;
  productListSubscription!:Subscription;  

  constructor(private apiService:ApiService, private userServices:UserServices, private store:Store<{userInfo:userSignUpData[]}>){}

  ngOnInit(){
    this.userServices.userId$.subscribe({
      next:(data)=>this.userId = data
    })

    this.productListSubscription =  this.apiService.completeProductList().subscribe({
      next:(data:product[])=>{        
        this.completeProductList = data
      },
      error:(error)=>{console.log(error)}
    })

    this.apiService.getCartList(this.userId);

    // this.userServices.userInfo$.subscribe({
    //   next:(data)=>{this.store.dispatch(updateUserData({newData:data}))}
    // })
    
  }

  ngOnDestroy(){
    if(this.productListSubscription){this.productListSubscription.unsubscribe()};
  }
}
