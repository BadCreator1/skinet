import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: IProduct;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ){
    this.bcService.set('@productDetails',' ')
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(){
    let id = this.activatedRoute.snapshot.paramMap.get('id')?? 0;
    this.shopService.getProduct(+id?? 0).subscribe(
      p=> {
        this.product = p;
        this.bcService.set('@productDetails',this.product.name);
      }
      , error=>{
      console.log(error)
    });
   
  }
}
