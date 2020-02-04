export class Profile {
    profile_id : number;
    firstname : string;
	lastname : string;
    email : string;
	description : string;
    skills: string[] = [];

    constructor(profile_id: number, firstname: string, lastname: string, email: string, description: string, skills: string[]) {
        this.profile_id = profile_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.description = description;
        this.skills = skills;
    }
}