import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/_api/api.service';
import { userSignUpData } from 'src/app/_interfaces/userCredentialsData';
import { SellerServices } from 'src/app/_services/seller.service';
import { UserServices } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  userId!: string;
  personalDetails!:userSignUpData[];
  name!:string;
  email!:string;
  userType!:string

  totalOrderCount!:number;
  totalMoneySpent:number = 0;
  
  constructor(private apiService: ApiService, private userServices: UserServices, private sellerServices:SellerServices, private store:Store<{userInfo:userSignUpData[]}>) { }

  ngOnInit() {
    //TO GET LOGGED USER'S IS
    this.userServices.userId$.subscribe({
      next: (id: string) => { this.userId = id },
      error: (error) => { console.log(error) }
    })

    //TO GET THE NUMBER OF ITEMS IN THE CART FOR THE LOGGED USER
    this.apiService.getCartList(this.userId);
    this.totalOrderInfo(this.userId);

    //NGRX
    this.store.select('userInfo').subscribe({
      next:(data:userSignUpData[])=>{
        if(data){          
          this.name = data[0].name;
          this.email = data[0].email;
          this.userType = data[0].userType;
        }else{          
          this.getPersonalDetails();
        }
      },
      error:(error)=>console.log(error)
    })
  }

  getPersonalDetails(){
    if(localStorage.getItem('user')){
      this.apiService.personalDetailsUser(this.userId).subscribe({
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

  totalOrderInfo(userId:string){
    this.apiService.getOrderForUser(userId).subscribe({
      next:(data)=>{
        this.totalOrderCount = data.length;
        data.forEach((item)=>{          
          this.totalMoneySpent = this.totalMoneySpent + item.totalPayment
        })
      },
      error:(error)=>console.log(error)
      
    })
  }  
}
