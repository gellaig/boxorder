import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    private baseUrl = "http://localhost:8080";
    private loginUrl = this.baseUrl + "/login";
	 private logoutUrl = this.baseUrl + "/logout";
    private registerUrl = this.baseUrl + "/register";
    private userUrl = this.baseUrl + "/user";
    private subsystemUrl = this.baseUrl +"/subsystem";
    
	authUser : string;
	
    constructor(private http: HttpClient,
				private router: Router,) {
    }

     getSubsystems() {
         return this.http.get(this.subsystemUrl);
    }

    authenticate(credentials, callback) {
        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});
		
        this.http.get(this.userUrl, {headers: headers}).subscribe(response => {
            console.log('auth: '+ response['name']);
            if (response['name']) {
               // sessionStorage.setItem('currentusername', response['name']);
			   this.authUser = response['name'];
            } else {
                this.authUser = null;
            }
            return callback && callback();
        },
		(error) => {
					this.authUser = null;
                    console.log('auth error');
                    console.log(error);
                });

    }

    login(model : any): Observable<string> {
       return this.http.post(this.loginUrl, {
            userName: model.username,
            password: model.password
        },{responseType: 'text'});
    }
	
	logout() {
		if ( this.authUser) {
			this.http.post(this.logoutUrl, {}).subscribe(() => {
			   this.authUser = null;
			},
			  (error) => {
				console.log(error);
			  }
			);  
		}
		this.router.navigate(['']);
    }

     register(model : any): Observable<string> {
       return this.http.post(this.registerUrl, {
            userName: model.username,
            password: model.password
        },{responseType: 'text'});
    }
}
