import {Component, OnInit} from '@angular/core';
import {ProductOrders} from "../models/product-orders.model";
import {Location} from "../models/location.model";
import {Subscription} from "rxjs/internal/Subscription";
import {EcommerceService} from "../services/EcommerceService";
import {LoginService} from '../../login/services/LoginService';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders: ProductOrders;
    locations: Location[] = [];
    selectedLocation : Location;
    sub: Subscription;


    constructor(public ecommerceService : EcommerceService,
                public loginService: LoginService) {

        this.orders = this.ecommerceService.ProductOrders;
        //this.loadTotal();
    }  

    loadLocations() {
        if ( this.locations.length <= 0) {
            this.ecommerceService.getAllLocations()
            .subscribe(
                (locations: any[]) => {
                    this.locations = locations;
                },
                (error) => console.log(error)
            );
        }
    }

    ngOnInit() {
        this.ecommerceService.paid = false;
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            this.orders = this.ecommerceService.ProductOrders;
        });
        //this.loadTotal();
       // this.loadLocations();
    }

    pay() {
        this.orders.location = this.selectedLocation;
		this.orders.username = this.loginService.authUser;
		//console.log('order user:' +this.orders.username);
        this.ecommerceService.saveOrder(this.orders).subscribe();
    }
/*
    loadTotal() {
        this.sub = this.ecommerceService.TotalChanged.subscribe(() => {
            this.total = this.ecommerceService.Total;
        });
    }
*/
    public onValueChanged(selected: any): void {
        this.selectedLocation = selected;
     //   console.log(this.selectedLocation); // should display the selected option.
    }
}
