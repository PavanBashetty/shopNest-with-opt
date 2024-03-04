import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_api/api.service';
import { SellerAuthService } from 'src/app/_api/sellerAuth.service';
import { UserAuthService } from 'src/app/_api/userAuth.service';
import { commonData, userLoginData, userSignUpData } from 'src/app/_interfaces/userCredentialsData';
import { SellerServices } from 'src/app/_services/seller.service';

@Component({
  selector: 'app-se-authentication',
  templateUrl: './se-authentication.component.html',
  styleUrls: ['./se-authentication.component.scss']
})
export class SeAuthenticationComponent {

  showLoginOnly:boolean = false;
  authErrorMsg!:string;

  constructor(private sellerAuthService:SellerAuthService, private apiService:ApiService, private sellerServices:SellerServices, private router:Router, private userAuthService:UserAuthService){}

  ngOnInit(){
    this.sellerAuthService.reloadSeller();
    this.userAuthService.reloadUser();
  }

  signup(commonData:commonData){
    let newSellerData: userSignUpData = {...commonData, userType:'seller'};
    this.sellerAuthService.sellerSignUp(newSellerData);
  }

  openLoginPage(){
    this.showLoginOnly = true;
  }

  login(sellerLoginData:userLoginData){
    this.authErrorMsg = '';
    this.apiService.sellerLogin(sellerLoginData).subscribe({
      next:(result:userSignUpData[])=>{
        if(result && result.length>0){
          this.sellerServices.storeSellerId(result[0].id);
          localStorage.setItem('seller',JSON.stringify(result));
          this.router.navigate(['seller/sellerHome'])
        }else{
          this.authErrorMsg = 'Email or password is incorrect!';
        }
      },
      error:(error:any)=>{console.log(error)}
    })
  }

  backToSignUp(){
    this.showLoginOnly = false;
  }
}
