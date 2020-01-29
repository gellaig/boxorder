import { ProductOrder } from "./product-order.model";
import { Location } from "./location.model";

export class Order {
    id: number;
    dateCreated: string;
    status : string;
    location: Location;
    totalOrderPrice: number;
	username : string;

    orderProducts: ProductOrder[] = [];

	 constructor(id: number, status: string,orderProducts: ProductOrder[],dateCreated: string, location : Location, totalOrderPrice: number, username: string) {
        this.id = id;
        this.status = status;
        this.location = location;
        this.orderProducts = orderProducts;
        this.dateCreated = dateCreated;
        this.totalOrderPrice = totalOrderPrice;
		this.username = username;
    }
}