import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import {ProductsComponent} from "./products/products.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {BoxComponent} from "./box/box.component";
import {LoginService} from '../login/services/LoginService';

@Component({
    selector: 'app-ecommerce',
    templateUrl: './ecommerce.component.html',
    styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
    private collapsed = true;
    orderFinished = false;
    showProduct = true;
    showBox = false;
    currentUser : string;

    @ViewChild('productsC', {static: false})
    productsC: ProductsComponent;

      @ViewChild('shoppingCartC', {static: true})
    shoppingCartC: ShoppingCartComponent;

    @ViewChild('ordersC', {static: true})
    ordersC: OrdersComponent;

    @ViewChild('boxC', {static: false})
    boxC: BoxComponent;


     constructor(private http: HttpClient,
     private router: Router,
	 private loginService: LoginService) {

       }

    ngOnInit() {
		//this.loginService.authenticate(undefined, undefined);
		console.log('authuser:' +this.loginService.authUser);
         if (!this.loginService.authUser){
            this.loginService.logout();
         }
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

    finishOrder(orderFinished: boolean) {
        this.orderFinished = orderFinished;
        this.showBox = false;
         this.showProduct = false;
    }

     reloadAllData(loginSuccess: boolean) {
        // this.loginC.getLoginUser();
        // console.log(this.loginC.userName);
         this.productsC.loadProducts();
         //this.productsC.loadOrders();
         this.boxC.loadLocations();
         this.ordersC.loadLocations();
    }

    reset(showbox: boolean, showpeoduct: boolean) {
        if (this.ordersC.paid) {
            this.productsC.reset();
            this.shoppingCartC.reset();
            this.ordersC.paid = false;
        }
        this.orderFinished = false;
        this.showBox = showbox;
        this.showProduct = showpeoduct;
    }
	
	showCart(){
		this.shoppingCartC.showCart = !this.shoppingCartC.showCart;
    }

}
