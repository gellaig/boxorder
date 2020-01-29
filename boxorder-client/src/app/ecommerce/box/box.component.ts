import { Component, OnInit } from '@angular/core';
import {EcommerceService} from "../services/EcommerceService";
import {Subscription} from "rxjs/internal/Subscription";
import { Order } from '../models/order.model';
import { Location } from '../models/location.model';
import {LoginService} from '../../login/services/LoginService';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
    ordersAtLocation : Order[] = [];
    locations: Location[] = [];
    selectedLocation : Location;

    constructor(private ecommerceService: EcommerceService,
                public loginService: LoginService) {
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
    // this.loadLocations();
  }

  showBoxContent() {
     this.ecommerceService.getOrdersByLocation(this.selectedLocation.id)
            .subscribe(
                (orders: any[]) => {
					console.log(orders);
                    this.ordersAtLocation = orders;
					console.log(this.ordersAtLocation);
                },
                (error) => console.log(error)
            ); 
  }

   public onValueChanged(selected: any): void {
        this.selectedLocation = selected;
        this.showBoxContent();
     //   console.log(this.selectedLocation); // should display the selected option.
    }

	deleteOrder(id: number) {
    this.ecommerceService.deleteOrder(id)
      .subscribe(
        data => {
          console.log(data);
          this.showBoxContent();
        },
        error => console.log(error));
  }
	
}
