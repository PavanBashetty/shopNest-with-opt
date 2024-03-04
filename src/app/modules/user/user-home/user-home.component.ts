import { Component } from '@angular/core';
import { ApiService } from 'src/app/_api/api.service';
import { product } from 'src/app/_interfaces/addProductData';
import { UserServices } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {

  completeProductList!: product[]
  userId!:string;

  constructor(private apiService:ApiService, private userServices:UserServices){}

  ngOnInit(){
    this.userServices.userId$.subscribe({
      next:(data)=>this.userId = data
    })

    this.apiService.completeProductList().subscribe({
      next:(data:product[])=>{        
        this.completeProductList = data
      },
      error:(error)=>{console.log(error)}
    })

    this.apiService.getCartList(this.userId);
  }
}
