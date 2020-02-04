import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/ecommerce/models/profile.model';

@Injectable()
export class LoginService {
    private baseUrl = "http://localhost:8080";
    private loginUrl = this.baseUrl + "/login";
	 private logoutUrl = this.baseUrl + "/logout";
    private registerUrl = this.baseUrl + "/register";
    private userUrl = this.baseUrl + "/user";
    private profileUrl = this.baseUrl + "/profile";
    private subsystemUrl = this.baseUrl +"/subsystem";
    public serverError : string;


	  authUser : string;
    private authHeader : any;
    
    constructor(private http: HttpClient,
				private router: Router,) {
    }

     getSubsystems() {
         return this.http.get(this.subsystemUrl);
    }

    authenticate(credentials): Observable<Object> {
		let authToken = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
		sessionStorage.setItem('authToken', authToken);
		
        this.authHeader = new HttpHeaders( {authorization : authToken});
		
       return this.http.get(this.userUrl, {headers: this.authHeader});

    }

    getProfile(): Observable<Object> {
        let params = new HttpParams().set('user', this.authUser);

        return this.http.get(this.profileUrl, {headers: this.authHeader, params: params});
    }

    updateProfile(profile : Profile): Observable<Object> {
        let params = new HttpParams().set('user', this.authUser);

        return this.http.put(this.profileUrl, profile, {headers: this.authHeader, params: params});
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
			   this.resetAuth();
			   this.router.navigate(['']);
			},
			  (error) => {
				console.log(error);
			  }
			);  
		}else {
			this.router.navigate(['']);
		}
    }

     register(model : any): Observable<string> {
       return this.http.post(this.registerUrl, {
            userName: model.username,
            password: model.password
        },{responseType: 'text'});
    }
	
	resetAuth(){
		this.authUser = null;
		 sessionStorage.setItem('authToken', '');
	}
}
