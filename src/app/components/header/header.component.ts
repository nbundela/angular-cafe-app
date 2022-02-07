import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public count: number = 0;
  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
    this.getCount();
    
  }

  public getCount(){
    this.subscription = this.cartSvc.getCartCount().subscribe((c) => {
      this.count = c ;
    })
    if(this.count === 0 && localStorage.length > 0 && localStorage.getItem('counts') !== null) {
      const value = localStorage.getItem("counts") as string
      this.count = JSON.parse(value);
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
