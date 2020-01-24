import { Routes, RouterModule } from '@angular/router';
import { EcommerceComponent } from './ecommerce/ecommerce.component';

const appRoutes: Routes = [
    { path: '', component: EcommerceComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'});