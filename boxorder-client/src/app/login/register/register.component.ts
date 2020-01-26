import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../services/LoginService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};  
  registerError : any;
  serverError : string;
  loading : boolean;

  constructor( 
        private router: Router,
        private loginService: LoginService
        ) { }

  ngOnInit() {
    this.loading = false;
    this.resetErrors();
  }

  resetErrors(){
          this.registerError = null;
          this.serverError = null;
  }

  register(){
      if (this.model.password === this.model.password2) {
            this.loading = true;
            this.resetErrors();
            this.loginService.register(this.model)
                .subscribe(resp => {
                if (resp === this.model.username) {
                    console.log('Register success');

                    this.resetErrors();
                    this.loading = false;

                    this.router.navigate(['']);
                } else {
                    //register failed
                    console.log(resp);
                    this.registerError = resp;
                    this.loading = false;
                }
            },
                (error) => {
                    this.serverError = "Server is currently unavailable. Please try again later."
                    console.log(error);
                    this.loading = false;
                }
            );
            }
  }

}
