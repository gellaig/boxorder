import {Component, OnInit} from '@angular/core';
import {ProductOrders} from "../models/product-orders.model";
import {Location} from "../models/location.model";
import {Subscription} from "rxjs/internal/Subscription";
import {EcommerceService} from "../services/EcommerceService";
import {LoginService} from '../../login/services/LoginService';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders: ProductOrders;
    locations: Location[] = [];
    total: number;
    paid: boolean;
    selectedLocation : Location;
    sub: Subscription;

    constructor(private ecommerceService: EcommerceService,
				private loginService: LoginService) {
        this.orders = this.ecommerceService.ProductOrders;
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
        this.paid = false;
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            this.orders = this.ecommerceService.ProductOrders;
        });
        this.loadTotal();
       // this.loadLocations();
    }

    pay() {
        this.paid = true;
        this.orders.location = this.selectedLocation;
		this.orders.username = this.loginService.authUser;
		console.log('order user:' +this.orders.username);
        this.ecommerceService.saveOrder(this.orders).subscribe();
        this.selectedLocation = null;
    }

    loadTotal() {
        this.sub = this.ecommerceService.TotalChanged.subscribe(() => {
            this.total = this.ecommerceService.Total;
        });
    }

    public onValueChanged(selected: any): void {
        this.selectedLocation = selected;
     //   console.log(this.selectedLocation); // should display the selected option.
    }
}
