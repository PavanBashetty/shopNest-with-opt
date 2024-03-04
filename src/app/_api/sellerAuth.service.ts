import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SellerServices } from "../_services/seller.service";
import { userSignUpData } from "../_interfaces/userCredentialsData";



@Injectable({providedIn:'root'})
export class SellerAuthService{
    
    private apiURL:string = 'http://localhost:3000';
    isSellerSignedUp:boolean = false;

    constructor(private http: HttpClient, private router:Router, private sellerServices:SellerServices){}

    sellerSignUp(newSellerData:userSignUpData){
        this.http.post<any>(`${this.apiURL}/seller`,newSellerData).subscribe({
            next:(result)=>{
                this.sellerServices.storeSellerId(result.id);
                this.isSellerSignedUp = true; 
                let resultArray = [result];
                localStorage.setItem('seller', JSON.stringify(resultArray));
                this.router.navigate(['seller/sellerHome']);
            },
            error:(error)=>{
                this.isSellerSignedUp = false;
                console.log(error)
            }
        })
    }

    reloadSeller(){
        if(localStorage.getItem('seller')){
            this.isSellerSignedUp = true;
            this.router.navigate(['seller/sellerHome']);
        }
    }    
}