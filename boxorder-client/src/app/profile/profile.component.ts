import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/LoginService';
import { Profile } from '../ecommerce/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile : Profile;

  constructor(public loginService : LoginService) { }

  ngOnInit() {
    if (this.loginService.authUser) {
      this.loadProfile();
    }
  }


  loadProfile() {
    //console.log('Loadprofile');
        this.loginService.getProfile()
            .subscribe(
                (profile: any) => {
                    this.profile = profile;
                },
                (error) => console.log(error)
            );
  }

}
