import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBasketItem, IBasketTotals } from 'src/app/shared/models/basket';
import { OrderItem } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  public items?: IBasketItem[];
  public orderTotals?: IBasketTotals;
  constructor(private route: ActivatedRoute
    , private ordersService: OrdersService
    , private bcService: BreadcrumbService) {
      this.bcService.set('@orderDetails', ' ')

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ordersService.getOrderDetails(params['id']).subscribe(order => {
        console.log(order);
        if (order)
          this.items = order.orderItems.map(i => ({ price: i.price, quantity: i.quantity, name: i.productName, pictureUrl: i.pictureUrl } as IBasketItem));
          this.orderTotals =  { subtotal: order.subtotal, total: order.total, shipping: order.shippingPrice }
          this.bcService.set('@orderDetails', `Order # ${order.id} ${order.status}`)
        console.log(this.items);
      });
    });
  }

}
