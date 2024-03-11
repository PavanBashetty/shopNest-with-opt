import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  addProductForm: FormGroup = new FormGroup({});
  
  constructor(private apiService:ApiService, private sellerServices:SellerServices, private formBuilder:FormBuilder){}

  ngOnInit(){
    this.sellerServices.sellerId$.subscribe({
      next:(data)=>{this.sellerId = data},
      error:()=>this.sellerId = ''
    })

    this.addProductForm = this.formBuilder.group({
      name:['', Validators.required],
      price:[0, Validators.required],
      color:['',Validators.required],
      description:['', Validators.required],
      image:['assets/images/', Validators.required]
    })

  }
  
  addNewProduct(){
    let dataToSend:product = {...this.addProductForm.value, sellerId:this.sellerId}
    this.apiService.addProduct(dataToSend).subscribe({
      next:()=>{
        this.addProductMsg = 'New product added successfully!!',
        setTimeout(()=>{this.addProductMsg = ''},2000);
        this.addProductForm.reset();
      },
      error:(error)=>{console.log(error)}
    })
  }
}
