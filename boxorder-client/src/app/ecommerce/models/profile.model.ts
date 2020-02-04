import { Skill } from "./skill.model";

export class Profile {
    profile_id : number;
    firstname : string;
	lastname : string;
    email : string;
	description : string;
    skills: Skill[] = [];

    constructor(profile_id: number, firstname: string, lastname: string, email: string, description: string, skills: Skill[]) {
        this.profile_id = profile_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.description = description;
        this.skills = skills;
    }
}