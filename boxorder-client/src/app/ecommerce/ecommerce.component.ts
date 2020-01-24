import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

import {ProductsComponent} from "./products/products.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {BoxComponent} from "./box/box.component";
import {LoginComponent} from "./login/login.component";

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

    @ViewChild('productsC', {static: false})
    productsC: ProductsComponent;

    @ViewChild('loginC', {static: false})
    loginC: LoginComponent;

      @ViewChild('shoppingCartC', {static: true})
    shoppingCartC: ShoppingCartComponent;

    @ViewChild('ordersC', {static: true})
    ordersC: OrdersComponent;

    @ViewChild('boxC', {static: false})
    boxC: BoxComponent;


     constructor(private http: HttpClient) { }

    ngOnInit() {
    
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
         this.loginC.getLoginUser();
         console.log(this.loginC.userName);
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
    showLogin(){
		this.loginC.showLogin = !this.loginC.showLogin;
    }
    
    logout() {
        sessionStorage.setItem('token', '');
        this.loginC.userName = null;
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
      };
    
}
