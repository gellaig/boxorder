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
    isLoginSuccess : number;

    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
     }

    ngOnInit() {
        sessionStorage.setItem('token', '');
        this.loadSubsystems();
    }

    loadSubsystems() {
        this.loginService.getSubsystems()
            .subscribe(
                (subsystems: any[]) => {
                    this.subsystems = subsystems;
                },
                (error) => console.log(error)
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
            this.loginService.login(this.model)
                .subscribe(isValid => {
                if (isValid) {
                    sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
                    
                    console.log('Login token: ' +   sessionStorage.getItem('token'));
                    console.log("Login username:" + this.model.username);

                    this.isLoginSuccess = 1;
                    //this.getUserName();
                     sessionStorage.setItem('currentusername', this.model.username);
                    this.router.navigate([this.selectedSubsystem.name]);
                } else {
                    //authentication failed
                    this.isLoginSuccess = 0; 
                    console.log("Authentication failed");
                }
            });
            }
    }

   public onValueChanged(selected: any): void {
        this.selectedSubsystem = selected;
    }
}
