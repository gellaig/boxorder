import {ProductOrder} from "../models/product-order.model";
import {Subject} from "rxjs/internal/Subject";
import {ProductOrders} from "../models/product-orders.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class EcommerceService {
     private baseUrl = "http://localhost:8080";
    private productsUrl = this.baseUrl +"/api/products";
    private ordersUrl = this.baseUrl +"/api/orders";
    private locationUrl = this.baseUrl +"/api/locations";

    private productOrder: ProductOrder;
    private orders: ProductOrders = new ProductOrders();

    private productOrderSubject = new Subject();
    private ordersSubject = new Subject();
    private totalSubject = new Subject();

    private total: number;

    ProductOrderChanged = this.productOrderSubject.asObservable();
    OrdersChanged = this.ordersSubject.asObservable();
    TotalChanged = this.totalSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    getAllProducts() {
        return this.http.get(this.productsUrl);
    }

     getAllLocations() {
         return this.http.get(this.locationUrl);
    }

    getOrdersByLocation(id : any) {
          return this.http.get(this.ordersUrl + "/location/" + id);
          //return this.http.get(this.ordersUrl);
    }

    saveOrder(order: ProductOrders) {
        return this.http.post(this.ordersUrl, order);
    }
	
	deleteOrder(id: number): Observable<any> {
		return this.http.delete(`${this.ordersUrl}/${id}`, { responseType: 'text' });
	}

    set SelectedProductOrder(value: ProductOrder) {
        this.productOrder = value;
        this.productOrderSubject.next();
    }

    get SelectedProductOrder() {
        return this.productOrder;
    }

    set ProductOrders(value: ProductOrders) {
        this.orders = value;
        this.ordersSubject.next();
    }

    get ProductOrders() {
        return this.orders;
    }

    get Total() {
        return this.total;
    }

    set Total(value: number) {
        this.total = value;
        this.totalSubject.next();
    }
}
