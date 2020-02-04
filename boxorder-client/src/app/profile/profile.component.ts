import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/LoginService';
import { Profile } from '../ecommerce/models/profile.model';
import { Skill } from '../ecommerce/models/skill.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile : Profile;
  newskill = new Skill();
  profileChanged = false;

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

  saveProfile() {
    //console.log('Loadprofile');
        this.loginService.updateProfile(this.profile)
            .subscribe(
                (response: any) => {
                   console.log(response);
                   this.profileChanged = false;
                },
                (error) => console.log(error)
            );
  }

  public onValueChanged(event: any): void {
      this.profileChanged = true;
  }

  addSkill(){
    this.profile.skills.push(this.newskill);
    this.newskill = new Skill();
  }
 
  deleteSkill(skill : Skill) {
    const index: number = this.profile.skills.indexOf(skill);
    if (index !== -1) {
        this.profile.skills.splice(index, 1);
    }        
  }

  delSkill(delskill : string){
    this.profile.skills.find(delskill);
  }

}
