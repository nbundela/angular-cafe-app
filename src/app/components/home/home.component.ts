import { Component, OnInit } from '@angular/core';
import {MenulistService} from '../../services/menulist.service'
import { Menulist } from '../../interfaces/menulist';
import { CartService } from '../../services/cart.service';
import { Icart } from '../../interfaces/icart';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public list:Menulist[] = [];
  public selectedItem: Menulist | undefined;
  public cartArray = {} as Icart;
  constructor(private svc: MenulistService,
    private cartSvc: CartService) { }

  ngOnInit(): void {
    this.showMenuList()
  }

  public showMenuList() {
    this.svc.getMenuList()
      .subscribe((data: Menulist[]) => {
        this.list = data;
      });
  }

  public showOffers(item: Menulist) {
    this.selectedItem = item;
  }

  public addToCart(selected:Menulist) {
    let comboOfferArr: Icart = {
      product1_name: selected.product_name,
      product1_price: selected.price,
      product1_tax: selected.tax,
      product1_image: selected.image,
      product_id: selected.product_id
    }
    this.cartArray = comboOfferArr;

    this.cartSvc.setItemToCart(this.cartArray);
  }

}
