import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Icart } from '../../interfaces/icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItems: Icart[] = [];
  constructor(private cartSvc: CartService) { }
  public total:any = 0 ;
  public show: boolean = false;
  public success: boolean = false;

  ngOnInit(): void {
    let cartItems = this.cartSvc.getItemFromCart();
    if (cartItems.length === 0 && 
      localStorage.length > 0 && localStorage.getItem('cart') !== null) {
      const value = localStorage.getItem("cart") as string
      cartItems = JSON.parse(value);
    }
    if(cartItems.length > 0) {
      this.cartItems = cartItems.map((m: Icart) => {
        if (m.product1_discountVal) {
          m.product1_valAfterTax = this.taxCalculation(m.product1_discountVal, m.product1_tax)
        } else {
          m.product1_valAfterTax = this.taxCalculation(m.product1_price, m.product1_tax)
        }
        if (m.product2_discountVal) {
          m.product2_valAfterTax = this.taxCalculation(m.product1_discountVal, m.product1_tax)
        }
        this.total += m.product1_valAfterTax;
        if (m.product2_valAfterTax) {
          this.total += m.product2_valAfterTax
        }
        return m;
        
      })
    }

  }

  private taxCalculation(price:any , tax: any ) {
      return price - (price * tax) / 100 ;
  }
  
  public removeFromCart(index: number) {
     this.cartSvc.removeItemFromCart(index);
     location.reload()
  }

  public checkout() {
    this.show = true;
    this.reset()
    setTimeout(() => {
      this.success = true;
      this.show = false;
    }, 3000);
  }

  public reset() {
    this.cartItems = [];
    this.cartSvc.removeAllFromCart();
    this.cartSvc.setCartCount(0);
    localStorage.clear();
  }
}
