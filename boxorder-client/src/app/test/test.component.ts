import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

   private collapsed = true;
   currentUser : string;

     constructor(private http: HttpClient,
     public router: Router) {

       }

    ngOnInit() {
      this.currentUser =  sessionStorage.getItem('currentusername');

      if (!this.currentUser){
            this.forwardToLogin();
         }
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

    forwardToLogin() {
      sessionStorage.setItem('token', '');
      sessionStorage.setItem('currentusername', '');
      this.router.navigate(['']);
    }

    logout() {
        this.http.post('logout', {}).subscribe(() => {
          this.forwardToLogin();
        },
          (error) => {
            console.log(error);
          }
        );   
    }

}
