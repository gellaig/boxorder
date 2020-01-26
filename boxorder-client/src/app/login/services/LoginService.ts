import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    private baseUrl = "http://localhost:8080";
    private loginUrl = this.baseUrl + "/login";
    private registerUrl = this.baseUrl + "/register";
    private userUrl = this.baseUrl + "/user";
    private subsystemUrl = this.baseUrl +"/subsystem";
    
    constructor(private http: HttpClient) {
    }

     getSubsystems() {
         return this.http.get(this.subsystemUrl);
    }

     getLoginUser(): Observable<Object>{
        const headers = new HttpHeaders({
            authorization : 'Basic ' + sessionStorage.getItem('token')
        });

        let options = { headers: headers };
        return this.http.get(this.userUrl, options);
    }

    authenticate(credentials, callback) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        this.http.get(this.userUrl, {headers: headers}).subscribe(response => {
            console.log('auth: '+ response['name']);
            if (response['name']) {
                sessionStorage.setItem('currentusername', response['name']);
            } else {
                sessionStorage.setItem('currentusername', '');
            }
            return callback && callback();
        });

    }

    login(model : any): Observable<string> {
       return this.http.post(this.loginUrl, {
            userName: model.username,
            password: model.password
        },{responseType: 'text'});
    }

     register(model : any): Observable<string> {
       return this.http.post(this.registerUrl, {
            userName: model.username,
            password: model.password
        },{responseType: 'text'});
    }
}
