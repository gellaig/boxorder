import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './services/LoginService';

import { Subsystem } from './models/subsystem.model';
import { HttpHeaders } from '@angular/common/http';
import { SubsystemComponent } from '../subsystem/subsystem.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    model: any = {};  
    loading : boolean;

     @ViewChild('subsystemC', {static: true})
    subsystemC: SubsystemComponent;


    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
     }

    ngOnInit() {
        console.log('authuser:' +this.loginService.authUser);
       // this.loadSubsystems();
        this.loading = false;
    }

    resetErrors(){
        this.loginService.serverError = null;
    }

     getServerError() : string{
        return this.loginService.serverError ;
    }

    login() {
		if (this.subsystemC.selectedSubsystem) {
			this.loading = true;
            this.resetErrors();
			this.loginService.authenticate(this.model).subscribe(response => {
            if (response['name']) {
			   console.log('login success');
			  
			   this.loginService.authUser = response['name'];
			   this.resetErrors();
			   this.loading = false;
			   
			   this.router.navigate([this.subsystemC.selectedSubsystem.name]);
            } else {
                this.loginService.resetAuth();
				//login failed
                console.log(response);
                this.loginService.serverError = JSON.stringify(response);
                this.loading = false;
            }
        },
		(error) => {
                    console.log('auth error');
                    //console.log(error);
					
					if (error.status == 0){
						this.loginService.serverError = "Server is currently unavailable. Please try again later.";
					}else {
						this.loginService.serverError = "Wrong username or password";
					}
					
					this.loginService.resetAuth();
					this.loading = false;
                });
		}
	}
}
