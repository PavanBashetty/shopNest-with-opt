import { Component } from '@angular/core';
import { ApiService } from 'src/app/_api/api.service';
import { orders } from 'src/app/_interfaces/addProductData';
import { UserServices } from 'src/app/_services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  orderData!:orders[]
  userId!:string;

  constructor(private apiService:ApiService, private userServices:UserServices){}

  ngOnInit(){
    this.userServices.userId$.subscribe({
      next:(data)=>{this.userId = data},
      error:(error)=>{console.log(error)}
    })

    if(!this.userId){
      let user:any = localStorage.getItem('user');
      if(user){
        user=JSON.parse(user);
        this.userId = user[0].id;
      }
    }    
    this.getOrderList(this.userId);
  }


  getOrderList(userId:string){
    this.apiService.getOrderForUser(userId).subscribe({
      next:(data:orders[])=>{
        this.orderData = data;      
      },
      error:(error)=>{console.log(error)}
    })
  }  
}
