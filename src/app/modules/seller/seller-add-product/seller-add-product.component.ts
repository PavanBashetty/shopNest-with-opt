import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/_api/api.service';
import { product } from 'src/app/_interfaces/addProductData';
import { SellerServices } from 'src/app/_services/seller.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {

  addProductMsg!:string;
  sellerId!:string;
  predefinedPath:string = 'assets/images/'
  @ViewChild('addProduct',{static:false}) addProductForm!:NgForm;
  
  constructor(private apiService:ApiService, private sellerServices:SellerServices){}

  ngOnInit(){
    this.sellerServices.sellerId$.subscribe({
      next:(data)=>{this.sellerId = data},
      error:()=>this.sellerId = ''
    })
  }

  addNewProduct(data:any){
    let dataToSend:product = {...data, sellerId:this.sellerId};    
    this.apiService.addProduct(dataToSend).subscribe({
      next:()=>{
        this.addProductMsg = 'New product added successfully!!',
        setTimeout(()=>{this.addProductMsg = ''}, 2000)
        this.addProductForm.resetForm();
        this.predefinedPath = 'assets/images/'
      },
      error:(error)=>{console.log(error)}
    })
  }  
  
}
