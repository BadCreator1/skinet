import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  basket$?: Observable<IBasket | null>;

  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  @Input() isBasket = true;
  @Input() items?: IBasketItem[];
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    if (!this.items) {
      if(this.basket$){
        this.items = (this.basket$ as IBasket).items;
      }
      
    }
    else {
      let basket: IBasket = { items: this.items }

    }
    if (!this.items){
      this.basket$ = this.basketService.basket$;
      
    }
    else{
      this.basket$ = new BehaviorSubject<IBasket | null>({items: this.items}).asObservable();
    }
  }

  decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }
  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }
  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }

}
