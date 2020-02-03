import { Routes, RouterModule } from '@angular/router';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {ProductsComponent} from './ecommerce/products/products.component';
import { RegisterComponent } from './login/register/register.component';
import { TestComponent } from './test/test.component';
import {OrdersComponent} from './ecommerce/orders/orders.component';
import { BoxComponent } from './ecommerce/box/box.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'ecommerce', component: EcommerceComponent,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'boxes', component: BoxComponent},
      {path: '**', redirectTo: 'products'}
    ]
     },
    { path: 'test', component: TestComponent ,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: '**', redirectTo: 'test'}
    ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);