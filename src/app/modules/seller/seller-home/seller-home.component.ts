import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/_api/api.service';
import { product } from 'src/app/_interfaces/addProductData';
import { SellerServices } from 'src/app/_services/seller.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {

  deleteSuccessMsg!:string;
  productList!: product[];
  sellerID!:string;
  trashIcon = faTrash;
  editIcon = faEdit;

    //TO EDIT A PRODUCT'S DETAIL
  @ViewChild('updateProductDetails', {static:true}) updateProductDetails!:TemplateRef<any>;
  private updateProductModalRef!:NgbModalRef;
  selectedProductId!:string;
  productName!:string;
  currentPrice!:number;
  currentDescription!:string;

  constructor(private http:HttpClient, private apiService:ApiService,private sellerServices: SellerServices, private router:Router, private modalService:NgbModal){}

  ngOnInit(){
    this.sellerServices.sellerId$.subscribe({
      next:(data)=>{this.sellerID = data},
      error:()=>this.sellerID = ''
    });
    this.displayProducts();
  }

  displayProducts(){
    this.apiService.getProductList(this.sellerID).subscribe({
      next:(data)=>{
        this.productList = data        
      },
      error:(error)=>{console.log(error)}
    })
  }

  deleteProduct(id:string){
    this.apiService.deleteProductAPI(id).subscribe({
      next:()=>{
        this.deleteSuccessMsg = 'Product deleted successfully!!';
        this.displayProducts();
        setTimeout(()=>{
          this.deleteSuccessMsg = '';
        },2000)
      },
      error:(error)=>{console.log(error)}
    })    
  }
  
  //TO EDIT
  openUpdateProductDialog(updateProductDetails:any,selectedProduct:product){
    this.updateProductModalRef = this.modalService.open(updateProductDetails);
    this.selectedProductId = selectedProduct.id;
    this.productName = selectedProduct.name
    this.currentPrice = selectedProduct.price;
    this.currentDescription = selectedProduct.description;
  }
  closeUpdateProductDialog(){
    if(this.updateProductModalRef){
      this.updateProductModalRef.close();
    }
  }
  submitUpdatedData(){
    const postData = {"price":this.currentPrice, "description":this.currentDescription};
    this.apiService.editProductDetails(this.selectedProductId, postData).subscribe({
      next:()=>{
        this.displayProducts();
        this.closeUpdateProductDialog();
      },
      error:(error)=>{console.log(error)}
    })
  }  


}
