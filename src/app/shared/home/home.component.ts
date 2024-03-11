import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/_api/api.service';
import { SellerAuthService } from 'src/app/_api/sellerAuth.service';
import { UserAuthService } from 'src/app/_api/userAuth.service';
import { product } from 'src/app/_interfaces/addProductData';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  popularProducts!:product[];
  trendyProducts!:product[];
  popularProductSubscription!:Subscription;
  trendyProductSubscription!: Subscription;
  
  constructor(private sellerAuthService:SellerAuthService, private apiService:ApiService, private userAuthService:UserAuthService){}

  ngOnInit(){
    this.sellerAuthService.reloadSeller();
    this.userAuthService.reloadUser();

    this.popularProductSubscription = this.apiService.popularProducts().subscribe({
      next:(data)=>{this.popularProducts = data},
      error:(error)=>{console.log(error)}
    })

    this.popularProductSubscription =  this.apiService.trendyProducts().subscribe({
      next:(data)=>{this.trendyProducts = data},
      error:(error)=>{console.log(error)}
    })

  }

  ngOnDestroy(){
    this.popularProductSubscription.unsubscribe();
    this.trendyProductSubscription.unsubscribe();
  }
}
