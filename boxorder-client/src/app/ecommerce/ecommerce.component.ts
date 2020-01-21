import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from "./products/products.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {BoxComponent} from "./box/box.component";

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

    @ViewChild('productsC', {static: true})
    productsC: ProductsComponent;

    @ViewChild('shoppingCartC', {static: true})
    shoppingCartC: ShoppingCartComponent;

    @ViewChild('ordersC', {static: true})
    ordersC: OrdersComponent;

    @ViewChild('boxC', {static: true})
    boxC: BoxComponent;


    constructor() {
    }

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
