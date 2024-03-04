import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/_api/api.service';
import { product } from 'src/app/_interfaces/addProductData';
import { SellerServices } from 'src/app/_services/seller.service';
import { UserServices } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuType!:string;
  sellerName!:string;
  userName!:string;
  searchIcon = faSearch;
  searchedResult!:product[]
  cartItems:number = 0;

  constructor(private router:Router, private sellerServices:SellerServices, private apiService:ApiService, private userServices:UserServices, private route:ActivatedRoute){}

  ngOnInit(){
   
    //To check if the logged in person a user or seller and store their data in state management    
    if(this.router.url){          
      if(localStorage.getItem('seller')){
        this.menuType = 'seller';
        let sellerStore = localStorage.getItem('seller');
        let sellerData = sellerStore && JSON.parse(sellerStore);
        this.sellerServices.storeSellerId(sellerData[0].id);
        this.sellerName = sellerData[0].name;          
      }else if(localStorage.getItem('user')){
        this.menuType = 'user';
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userServices.storeUserId(userData[0].id);
        this.userName = userData[0].name;
      }
      else{
        this.menuType = 'default';
      }
    }

    //Get count of items stored in localStorage's cart. [Works before login]
    this.getCartDataFromLocalStorage();

    //To update the item count whenever user adds/remove an item
    this.apiService.cartDataEmit.subscribe({
      next:(cartItems:product[])=> {
        cartItems.length == 0 ? this.getCartDataFromLocalStorage() : this.cartItems = cartItems.length;
      },
      error:()=>{this.cartItems = 0}      
    })

  }


  getCartDataFromLocalStorage(){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
  }

  // getName(userId:string){
  //   if(localStorage.getItem('seller')){
  //     this.apiService.personalDetailsSeller(userId).subscribe({
  //       next:(data:userSignUpData[])=>{
  //         this.APIpersonalDetails = data;
  //         this.APIName = this.APIpersonalDetails[0].name;
  //       },
  //       error:(error)=>{console.log(error)}
  //     })
  //   }else if(localStorage.getItem('user')){
  //     this.apiService.personalDetailsUser(userId).subscribe({
  //       next:(data:userSignUpData[])=>{
  //         this.APIpersonalDetails = data;
  //         this.APIName = this.APIpersonalDetails[0].name;
  //       },
  //       error:(error)=>{console.log(error)}
  //     })
  //   }
  // }  

  sellerLogout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.apiService.cartDataEmit.emit([]);
  }  
}
