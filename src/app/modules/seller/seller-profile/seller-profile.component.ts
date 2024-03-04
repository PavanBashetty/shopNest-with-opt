import { Component } from '@angular/core';
import { ApiService } from 'src/app/_api/api.service';
import { userSignUpData } from 'src/app/_interfaces/userCredentialsData';
import { SellerServices } from 'src/app/_services/seller.service';
import { UserServices } from 'src/app/_services/user.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent {

  sellerId!:string;
  personalDetails!:userSignUpData[];
  name!:string;
  email!:string;
  userType!:string
  
  constructor(private apiService: ApiService, private userServices: UserServices, private sellerServices:SellerServices) { }

  ngOnInit() {
    //TO GET LOGGED SELLER'S IS
    this.sellerServices.sellerId$.subscribe({
      next:(id:string)=>{this.sellerId = id},
      error:(error)=>{console.log(error)}
    })


    this.getPersonalDetails();    
  }
  
  getPersonalDetails(){
    if(localStorage.getItem('seller')){
      this.apiService.personalDetailsSeller(this.sellerId).subscribe({
        next:(data:userSignUpData[])=>{          
          this.personalDetails = data
          this.name = this.personalDetails[0].name;
          this.email = this.personalDetails[0].email;
          this.userType = this.personalDetails[0].userType;
        },
        error:(error)=>{console.log(error)}
      })
    }
  }

}
