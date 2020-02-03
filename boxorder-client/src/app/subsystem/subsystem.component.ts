import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/services/LoginService';
import { Subsystem } from '../login/models/subsystem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subsystem',
  templateUrl: './subsystem.component.html',
  styleUrls: ['./subsystem.component.css']
})
export class SubsystemComponent implements OnInit {

    subsystems: Subsystem[] = [];
    selectedSubsystem : Subsystem;

  constructor(public router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
  }


  loadSubsystems() {
		if ( this.subsystems.length <= 0)  {
			this.loginService.getSubsystems()
            .subscribe(
                (subsystems: any[]) => {
                    this.subsystems = subsystems;
                    this.loginService.serverError = null;
                },
                (error) => {
                    this.loginService.serverError = "Server is currently unavailable. Please try again later."
                    console.log(error);
                }
            );
		}
  }

    public onValueChanged(selected: any): void {
     // console.log(this.router.url);
        this.selectedSubsystem = selected;
        if (this.router.url != '/') {
          this.router.navigate([this.selectedSubsystem.name]);
        }
    }

}
