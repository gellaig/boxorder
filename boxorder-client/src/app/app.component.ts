import {Component} from '@angular/core';
import {LoginService} from "./login/services/LoginService";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [LoginService]
})
export class AppComponent {

}
