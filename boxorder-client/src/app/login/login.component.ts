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
    serverError : string;
    loading : boolean;

     @ViewChild('subsystemC', {static: true})
    subsystemC: SubsystemComponent;


    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
       // this.loginService.authenticate(undefined);
     }

    ngOnInit() {
        console.log('authuser:' +this.loginService.authUser);
       // this.loadSubsystems();
        this.loading = false;
    }

    resetErrors(){
        this.serverError = null;
    }

    loadSubsystems() {
		this.subsystemC.loadSubsystems(this.serverError);
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
                this.loginService.authUser = null;
				//login failed
                console.log(response);
                this.serverError = JSON.stringify(response);
                this.loading = false;
            }
        },
		(error) => {
                    console.log('auth error');
                    //console.log(error);
					
					if (error.status == 0){
						this.serverError = "Server is currently unavailable. Please try again later.";
					}else {
						this.serverError = "Wrong username or password";
					}
					
					this.loginService.authUser = null;
					this.loading = false;
                });
		}
	}
}
