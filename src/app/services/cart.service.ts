import { Injectable } from '@angular/core';
import { Icart } from '../interfaces/icart';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private data:any[] = [];
  private count: number = 0;
  constructor() { }
  private subject = new Subject<number>();

  public setItemToCart(obj:Icart ) {
    let Exist;
    if(this.data.length === 0 && localStorage.length > 0 && localStorage.getItem('cart') !== null) {
      const value = localStorage.getItem("cart") as string
      this.data = JSON.parse(value);
    }
    if (this.data.length > 0) {
      Exist =  this.data.some((e) => {
        return e.category_name && e.category_name === obj.category_name && e.product_id !== obj.product_id
      });
    } 
    if(Exist) {
      const arr =  this.data.filter((e) => {
        return !e.combo ||  e.category_name !== obj.category_name 
      });
      this.data = arr;
      this.data.push(obj);
      this.setCartCount(this.data.length )
    }
    else {
      this.data.push(obj);
      this.incCartCount();
    }

    localStorage.setItem("cart", JSON.stringify(this.data))
  }

  public removeItemFromOffers(cat_name: string) {
    if(this.data.length > 0) {
      const arr =  this.data.filter((e) => {
        return !e.combo ||  e.category_name !== cat_name 
      });
      this.data = arr;
      this.setCartCount(this.data.length )
      localStorage.setItem("cart", JSON.stringify(this.data))
    }
  }

  public removeItemFromCart(index: number) {
    if(this.data.length === 0 && localStorage.length > 0 && localStorage.getItem('cart') !== null) {
      const value = localStorage.getItem("cart") as string
      this.data = JSON.parse(value);
    }

    this.data.map((e,i) => {
       if (i === index) {
         this.data.splice(i, 1)
         this.decCartCount()
         localStorage.setItem("cart", JSON.stringify(this.data))
       }
    });
    
  }

  public removeAllFromCart() {
    this.data = [];
  }
  
  public getItemFromCart() {  
    return this.data;  
  }
  
  private incCartCount() {
    if(this.count === 0 && localStorage.length > 0 && localStorage.getItem('counts') !== null) {
      const value = localStorage.getItem("counts") as string
      this.count = JSON.parse(value);
    }
    this.subject.next(++this.count);
    localStorage.setItem("counts", JSON.stringify(this.count))
  }

  private decCartCount() {
    if (this.count >= 0) {
      this.subject.next(--this.count);
      localStorage.setItem("counts", JSON.stringify(this.count))
    }
  }

  public getCartCount() {
    return this.subject.asObservable();;
  }

  public setCartCount(val:any) {
    this.count = val;
    this.subject.next(val);
    localStorage.setItem("counts", JSON.stringify(this.count))
  }
}
