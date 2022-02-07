import { Component, OnInit, Input } from '@angular/core';
import { Menulist } from '../../interfaces/menulist';
import {MenulistService} from '../../services/menulist.service';
import { CartService } from '../../services/cart.service';
import { Icart } from '../../interfaces/icart';

@Component({
  selector: 'app-product-offers',
  templateUrl: './product-offers.component.html',
  styleUrls: ['./product-offers.component.scss']
})
export class ProductOffersComponent implements OnInit {
  public _selectedItem: Menulist | undefined;
  public products:Menulist[] = [];
  public cartArray = {} as Icart;
  public alertDisplay: any = undefined;
  public countNum: number = 0;
  constructor(
    private svc: MenulistService,
    private cartSvc: CartService) { }

  @Input() 
  set selectedItem(value: Menulist | undefined) {
    if(value !== undefined) {
      this._selectedItem = value;
      this.getOtherProducts()
    }
  }
  get selectedItem(): Menulist | undefined {
    return this._selectedItem;
  }

  ngOnInit(): void {
    
  }

  public getOtherProducts() {
    this.svc.getMenuList()
      .subscribe((data: Menulist[]) => {
        const products = data;
        this.products = products.filter((p) => p.category_name !== this._selectedItem?.category_name)
      });
  }

  public calculateDiscount(price: number, discount: any) {
    return price - (price * discount)/100;
  }

  public addToCart(selected:Menulist, item:Menulist, index:number) {
    let comboOfferArr:Icart = {
      product1_name: selected.product_name,
      product1_price: selected.price,
      product1_tax: selected.tax,
      product1_image: selected.image,
      product1_discountVal: this.calculateDiscount(selected.price, item.discount),
      product2_name: item?.product_name,
      product2_price: item?.price,
      product2_tax: item?.tax,
      product2_image: item?.image,
      product2_discount: item?.discount,
      product2_discountVal: this.calculateDiscount(item.price, item.discount),
      product_id: `combo-${index}`,
      category_name: selected.category_name,
      combo: true
    }
    this.cartArray = comboOfferArr;
    this.alertDisplay = 'added';
    this.countNum = index;
    this.cartSvc.setItemToCart(this.cartArray);
    this.hideMessage()
  }


  public removeFromCart(cat_name: string, index: number) {
    if (this.cartArray !== undefined) {
      this.alertDisplay = 'removed';
      this.countNum = index;
      this.cartArray = {} as Icart;
      this.cartSvc.removeItemFromOffers(cat_name);
      this.hideMessage()
    }
  }

  public hideMessage() {
    setTimeout(() => {
      this.alertDisplay = undefined
    }, 1000);
  }

}
