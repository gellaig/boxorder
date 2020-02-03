import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injectable} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { SubsystemComponent } from './subsystem/subsystem.component';
import { ProfileComponent } from './profile/profile.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

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
        SubsystemComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    exports: [RouterModule],
    providers: [EcommerceService, LoginService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
