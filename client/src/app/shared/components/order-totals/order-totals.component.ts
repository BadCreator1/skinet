import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$?: Observable<IBasketTotals | null>;
  @Input() basketTotal?: IBasketTotals;
  constructor(private basketService: BasketService) {

  }

  ngOnInit(): void {
    if (!this.basketTotal){
      this.basketTotal$ = this.basketService.basketTotal$;
      
    }
    else{
      this.basketTotal$ = new BehaviorSubject<IBasketTotals | null>(this.basketTotal).asObservable();
    }
      
  }


}
