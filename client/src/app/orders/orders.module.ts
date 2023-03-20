import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OrdersComponent,
    OrdersDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ]
})
export class OrdersModule { }
