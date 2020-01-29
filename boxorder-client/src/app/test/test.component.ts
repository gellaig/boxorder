import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {LoginService} from '../login/services/LoginService';
import { SubsystemComponent } from '../subsystem/subsystem.component';

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
			http.get('http://localhost:8080/resource').subscribe(data => this.greeting = data);
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
