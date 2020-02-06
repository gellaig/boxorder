import { Skill } from "./skill.model";
import { City } from "./city.model";

export class Profile {
    id : number;
    firstname : string;
	lastname : string;
    email : string;
	description : string;
    skills: Skill[] = [];
    cities: City[] = [];
    profilePicture : Blob;

    constructor(profile_id: number, firstname: string, lastname: string, email: string,
                 description: string, skills: Skill[], cities: City[], profilePicture : Blob) {
        this.id = profile_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.description = description;
        this.skills = skills;
         this.cities = cities;
         this.profilePicture = profilePicture;
    }
}