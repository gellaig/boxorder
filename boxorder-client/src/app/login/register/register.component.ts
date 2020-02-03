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
          this.loginService.serverError = null;
  }

   getServerError() : string{
        return this.loginService.serverError ;
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
                    this.loginService.serverError = resp;
                    this.loading = false;
                }
            },
                (error) => {
					//console.log(error);
					if (error.status == 0){
						this.loginService.serverError = "Server is currently unavailable. Please try again later.";
					}else {
						let errMsg = JSON.parse(error.error);
						this.loginService.serverError = errMsg.message;
					}
                    this.loading = false;
                }
            );
            }
  }

}
