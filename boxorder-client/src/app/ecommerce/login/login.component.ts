import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import {EcommerceService} from "../services/EcommerceService";
import {Subscription} from "rxjs/internal/Subscription";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    model: any = {};
    showLogin = false;
     userName: string;

      @Output() onLoginSuccess: EventEmitter<boolean>;


    constructor(
        private router: Router,
        private http: HttpClient,
        private ecommerceService: EcommerceService
    ) {
      this.showLogin = false;
       this.onLoginSuccess = new EventEmitter<boolean>();
     }
    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

    getLoginUser() {
        //get user
         let urlu = 'http://localhost:8080/user';

        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + sessionStorage.getItem('token')
        });

        let options = { headers: headers };
        this.http.post<Observable<Object>>(urlu, {}, options).
            subscribe(principal => {
                this.userName = principal['name'];
                console.log(this.userName);
            },
            error => {
                if(error.status == 401)
                    alert('Unauthorized');
            }
        );
    }

    login() {
        let url = 'http://localhost:8080/login';
        this.http.post<Observable<boolean>>(url, {
            userName: this.model.username,
            password: this.model.password
        }).subscribe(isValid => {
            if (isValid) {
                sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
                this.showLogin = false;
                this.userName = this.model.username;

                console.log('Login success: ' +   this.userName);
                this.onLoginSuccess.emit(true);
                //this.getLoginUser();
                //this.router.navigate(['']);
            } else {
                alert("Authentication failed.")
            }
        });
    }
}
