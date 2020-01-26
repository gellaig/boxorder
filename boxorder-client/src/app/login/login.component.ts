import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './services/LoginService';

import { Subsystem } from './models/subsystem.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    model: any = {};  
    subsystems: Subsystem[] = [];
    selectedSubsystem : Subsystem;
    loginError : any;
    serverError : string;
    loading : boolean;

    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
     }

    ngOnInit() {
        sessionStorage.setItem('token', '');
        this.loadSubsystems();
        this.loading = false;
    }

    resetErrors(){
        this.loginError = null;
        this.serverError = null;
    }

    loadSubsystems() {
        this.loginService.getSubsystems()
            .subscribe(
                (subsystems: any[]) => {
                    this.subsystems = subsystems;
                    this.serverError = null;
                },
                (error) => {
                    this.serverError = "Server is currently unavailable. Please try again later."
                    console.log(error);
                }
            );
    }

    getUserName() {
            this.loginService.getLoginUser()
               .subscribe(principal => {
                let userName = principal['name'];
                 sessionStorage.setItem('currentusername', btoa(userName));
                console.log("currentusername: " + userName);
            },
            error => {
                console.log("getuser error:");
                console.log(error);
            }
        );
    }

   login() {
        if (this.selectedSubsystem) {
            this.loading = true;
            this.resetErrors();
            this.loginService.login(this.model)
                .subscribe(resp => {
                if (resp === this.model.username) {
                    sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
                    
                    console.log('Login token: ' +   sessionStorage.getItem('token'));
                    console.log("Login username:" + this.model.username);

                     this.resetErrors();
                     this.loading = false;
                    //this.getUserName();
                     sessionStorage.setItem('currentusername', this.model.username);
                    this.router.navigate([this.selectedSubsystem.name]);
                } else {
                    //authentication failed
                    this.loading = false;
                     this.loginError = resp; 
                    console.log(resp);
                }
            },
                (error) => {
                    this.loading = false;
                    this.serverError = "Server is currently unavailable. Please try again later."
                    console.log(error);
                }
            );
        }
    }

   public onValueChanged(selected: any): void {
        this.selectedSubsystem = selected;
    }
}
