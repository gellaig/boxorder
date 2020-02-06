import { Component, OnInit, Directive, Input } from '@angular/core';
import { LoginService } from '../login/services/LoginService';
import { Profile } from '../ecommerce/models/profile.model';
import { Skill } from '../ecommerce/models/skill.model';
import { City } from '../ecommerce/models/city.model';

@Directive({  
  selector: '[profile-image]',  
  providers: [BROWSER_SANITIZATION_PROVIDERS],  
  host: {  
    '[src]': 'sanitizedImageData'  
  }  
}) 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile : Profile;
  newskill = new Skill();
  newcity = new City();
  profileChanged = false;
  updateSuccess = false;
  imageData: any;  
  sanitizedImageData: any;  
  @Input('profile-image') profileId: number;  

  constructor(public loginService : LoginService,
              private sanitizer: DomSanitizationService) { }

  ngOnInit() {
    this.updateSuccess = false;
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
                    console.log(this.profile.profilePicture);
                    this.imageData = 'data:image/png;base64,' + this.profile.profilePicture;  
                     this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData);  

                    this.profileChanged = false;

                    if (!this.profile.description)
                      this.profile.description = "";
                },
                (error) => console.log(error)
            );
  }

  saveProfile() {
    //console.log('Loadprofile');
        this.loginService.updateProfile(this.profile)
            .subscribe(
                (response :any) => {
                   console.log(response);
                   this.profileChanged = false;
                   this.updateSuccess = true;
                },
                (error) => {
                  console.log(error);
                  this.loadProfile();
                }
            );
  }

  public onValueChanged(event: any): void {
      this.profileChanged = true;
      this.updateSuccess = false;
  }

  addSkill(){
    this.updateSuccess = false;

    //return if the element already exists
    if (this.profile.skills.filter(e => e.name.toLocaleLowerCase() === this.newskill.name.toLocaleLowerCase()).length > 0){
        this.newskill = new Skill(); 
        return;
    }
    else {
      this.profile.skills.push(this.newskill);
      this.profileChanged = true;
      this.newskill = new Skill(); 
    }
  }
 
  deleteSkill(skill : Skill) {
    const index: number = this.profile.skills.indexOf(skill);
    if (index !== -1) {
        this.profile.skills.splice(index, 1);
        this.profileChanged = true;
        this.updateSuccess = false;
    }        
  }

    addCity(){
    this.updateSuccess = false;

    //return if the element already exists
    if (this.profile.cities.filter(e => e.name.toLocaleLowerCase() === this.newcity.name.toLocaleLowerCase()).length > 0){
        this.newcity = new City(); 
        return;
    }
    else {
      this.profile.cities.push(this.newcity);
      this.profileChanged = true;
      this.newcity = new City(); 
    }
  }
 
  deleteCity(city : City) {
    const index: number = this.profile.cities.indexOf(city);
    if (index !== -1) {
        this.profile.cities.splice(index, 1);
        this.profileChanged = true;
        this.updateSuccess = false;
    }        
  }

}
