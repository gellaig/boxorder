import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    private baseUrl = "http://localhost:8080";
    private loginUrl = this.baseUrl + "/login";
    private userUrl = this.baseUrl + "/user";
    private subsystemUrl = this.baseUrl +"/subsystem";
    
    constructor(private http: HttpClient) {
    }

     getSubsystems() {
         return this.http.get(this.subsystemUrl);
    }

     getLoginUser(): Observable<Object>{
        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + sessionStorage.getItem('token')
        });

        let options = { headers: headers };
        return this.http.post<Observable<Object>>(this.userUrl, {}, options);
    }

    login(model : any): Observable<Object> {
       return this.http.post<Observable<Object>>(this.loginUrl, {
            userName: model.username,
            password: model.password
        });
    }
}
