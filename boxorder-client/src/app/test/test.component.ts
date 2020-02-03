import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {LoginService} from '../login/services/LoginService';
import { SubsystemComponent } from '../subsystem/subsystem.component';
import { ProfileComponent } from '../profile/profile.component';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

   private collapsed = true;
   greeting = {}; 
   currentUser : string;

    @ViewChild('subsystemC', {static: true})
    subsystemC: SubsystemComponent;

     constructor(private http: HttpClient,
     public router: Router,
	   public loginService: LoginService) {
	   
			 const authHeader = new HttpHeaders( {authorization : sessionStorage.getItem('authToken')});	 
			http.get('http://localhost:8080/resource', {headers: authHeader}).subscribe(data => this.greeting = data, (error) => this.greeting ={"id": "","content": "You need to be an admin to see this content."});
       }

    ngOnInit() {
		console.log('authuser:' +this.loginService.authUser);
      if (!this.loginService.authUser){
            this.loginService.logout();
         }
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

}
