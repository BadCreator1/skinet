import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
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
  quantity = 1;
  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ')
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  addItemToBasket() {
    if (this.product)
      this.basketService.addItemToBasket(this.product, this.quantity);
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    this.quantity--;
    if(this.quantity<=0){
      this.quantity = 1;
    }
  }
  loadProducts() {
    let id = this.activatedRoute.snapshot.paramMap.get('id') ?? 0;
    this.shopService.getProduct(+id ?? 0).subscribe(
      p => {
        this.product = p;
        this.bcService.set('@productDetails', this.product.name);
      }
      , error => {
        console.log(error)
      });

  }
}
