import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';


@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef
  @ViewChild('cardCvc') cardCvcElement?: ElementRef

  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  loading: any;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;
  cardHandler = this.onChange.bind(this);
  constructor(private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService
    , private router: Router
    , private fb: FormBuilder
    ,) {
    console.log("constructor", this.checkoutForm);
  }
  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  ngAfterViewInit(): void {

    this.cardNumber = elements.create('cardNumber');
    if (this.cardNumberElement) {
      this.cardNumber.mount(this.cardNumberElement.nativeElement);
      this.cardNumber.addEventListener('change', this.cardHandler);
    }


    this.cardExpiry = elements.create('cardExpiry');
    if (this.cardExpiryElement) {
      this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
      this.cardExpiry.addEventListener('change', this.cardHandler);
    }


    this.cardCvc = elements.create('cardCvc');
    if (this.cardCvcElement) {
      this.cardCvc.mount(this.cardCvcElement.nativeElement);
      this.cardCvc.addEventListener('change', this.cardHandler);
    }


  }

  ngOnInit(): void {

  }
  onChange(event: any): void {
    let error = event.error;

    if (error) {
      this.cardErrors = error.message;
    }
    else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
      default:
        break;
    }
  }
  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent) {
        if (basket)
          this.basketService.deleteBasket(basket);

        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      }
      else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }

  }
  private async confirmPaymentWithStripe(basket: IBasket | null) {
    return stripe.confirmCardPayment(basket?.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    })
  }
  private async createOrder(basket: IBasket | null) {
    const orderToCreate = this.getOrderToCreate(basket);
    return this.checkoutService.createOrder(orderToCreate).toPromise();

  }
  getOrderToCreate(basket: IBasket | null) {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value ?? 0;

    return {
      basketId: basket?.id ?? '',
      deliveryMethodId: +deliveryMethodId,
      shipToAddress: this.checkoutForm?.get('addressForm')?.value
    }
  }
}
