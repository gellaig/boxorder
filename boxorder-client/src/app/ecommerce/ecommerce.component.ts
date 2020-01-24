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
    userName: string;

    @ViewChild('productsC', {static: true})
    productsC: ProductsComponent;

    @ViewChild('loginC', {static: true})
    loginC: LoginComponent;

      @ViewChild('shoppingCartC', {static: true})
    shoppingCartC: ShoppingCartComponent;

    @ViewChild('ordersC', {static: true})
    ordersC: OrdersComponent;

    @ViewChild('boxC', {static: true})
    boxC: BoxComponent;


     constructor(private http: HttpClient) { }

    ngOnInit() {
        let url = 'http://localhost:8080/user';

        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + sessionStorage.getItem('token')
        });

        let options = { headers: headers };
        this.http.post<Observable<Object>>(url, {}, options).
            subscribe(principal => {
                this.userName = principal['name'];
            },
            error => {
                if(error.status == 401)
                    alert('Unauthorized');
            }
        );
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

    finishOrder(orderFinished: boolean) {
        this.orderFinished = orderFinished;
        this.showBox = false;
         this.showProduct = false;
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
        this.userName = null;
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
