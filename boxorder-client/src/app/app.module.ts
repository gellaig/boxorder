import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { routing }        from './app.routing';

import {AppComponent} from './app.component';
import {EcommerceComponent} from './ecommerce/ecommerce.component';
import {ProductsComponent} from './ecommerce/products/products.component';
import {ShoppingCartComponent} from './ecommerce/shopping-cart/shopping-cart.component';
import {OrdersComponent} from './ecommerce/orders/orders.component';
import {EcommerceService} from "./ecommerce/services/EcommerceService";
import {LoginService} from "./login/services/LoginService";
import { BoxComponent } from './ecommerce/box/box.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './login/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        EcommerceComponent,
        ProductsComponent,
        ShoppingCartComponent,
        OrdersComponent,
        BoxComponent,
        RegisterComponent,
        LoginComponent,
        TestComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    exports: [RouterModule],
    providers: [EcommerceService, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
