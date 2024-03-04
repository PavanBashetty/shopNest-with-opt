import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_api/api.service';
import { cart, priceSummary } from 'src/app/_interfaces/addProductData';
import { UserServices } from 'src/app/_services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  cartData!:cart[];
  userId!:string;
  priceSummary:priceSummary = {
    price:0,
    deliveryCharge:0,
    total:0
  }

  constructor(private apiService:ApiService, private userServices:UserServices, private router:Router){}

  ngOnInit(){
    this.userServices.userId$.subscribe({
      next:(data)=>{this.userId = data},
      error:(error)=>{console.log(error)}
    })

    this.getCartDataDetails();

    this.apiService.getCartList(this.userId);
  }

  getCartDataDetails(){
    this.apiService.currentUserCart(this.userId).subscribe({
      next:(data:cart[])=>{
        this.cartData = data;        
        let price = 0;       

        data.forEach((item)=>{
          if(item.quantity){price = price + (+item.price * +item.quantity)}
        })
        this.priceSummary.price = price;
        this.priceSummary.deliveryCharge = price * 0.02;
        this.priceSummary.total = (this.priceSummary.price + this.priceSummary.deliveryCharge)
      },
      error:(error)=>{console.log(error)}
    })
  }

  removeFromCart(cartId:string|undefined){
    if(cartId){
      this.apiService.postLoginremoveFromCart(cartId).subscribe({
        next:()=>{
          this.getCartDataDetails();
          this.apiService.getCartList(this.userId);
        },
        error:(error)=>{console.log(error)}
      })
    }
  }

  checkout(){
    this.router.navigate(['/user/userCheckout'])
  }
  
}
