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
import { SubsystemComponent } from '../subsystem/subsystem.component';

@Component({
    selector: 'app-ecommerce',
    templateUrl: './ecommerce.component.html',
    styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
    private collapsed = true;
    orderFinished = false;
    currentUser : string;

    @ViewChild('subsystemC', {static: true})
    subsystemC: SubsystemComponent;

      @ViewChild('shoppingCartC', {static: true})
    shoppingCartC: ShoppingCartComponent;

     constructor(private http: HttpClient,
     private router: Router,
	 public loginService: LoginService) {

       }

    ngOnInit() {
		console.log('authuser:' +this.loginService.authUser);
         if (!this.loginService.authUser){
            this.loginService.logout();
         }
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

    reset() {
           // console.log('RESET');
            this.shoppingCartC.reset();
    }
	
	showCart(){
		this.shoppingCartC.showCart = !this.shoppingCartC.showCart;
    }

}
