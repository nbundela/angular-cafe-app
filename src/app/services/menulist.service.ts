import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menulist } from '../interfaces/menulist';
import {ITEM_LIST} from '../constants/constant'

@Injectable({
  providedIn: 'root'
})
export class MenulistService {

  constructor(private http: HttpClient) { }

  getMenuList() {
    return this.http.get<Menulist[]>(ITEM_LIST);
  }
}
