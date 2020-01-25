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
  isRegisterSuccess : number;

  constructor( 
        private router: Router,
        private loginService: LoginService
        ) { }

  ngOnInit() {
  }

  register(){
    console.log("register");
    this.isRegisterSuccess = 0;
  }
}
