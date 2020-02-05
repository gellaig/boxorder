package com.example.boxorderserver.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Fetch;

@Entity
@Table(name = "profile")
public class Profile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String firstname;
	
	private String lastname;
	
	@Email(message = "Email should be valid")
	private String email;
	
	 @Size( max = 500, message 
		      = "Description must be less than 500 characters")
	 private String description;
	
	 @OneToMany(fetch = FetchType.EAGER)
	 @Valid
	 @Fetch(value = FetchMode.SUBSELECT)
	 private List<Skill> skills = new ArrayList<>();

	 @OneToMany(fetch = FetchType.EAGER)
	 @Valid
	 @Fetch(value = FetchMode.SUBSELECT)
	 private List<City> cities = new ArrayList<>();

	 
	 
	public Profile(Long profile_id, String firstname, String lastname,
			@Email(message = "Email should be valid") String email,
			@Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters") String description,
			@Valid List<Skill> skills, @Valid List<City> cities) {
		this.id = profile_id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.description = description;
		this.skills = skills;
		this.cities = cities;
	}
	
	public Profile() {}



	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	@Override
	public String toString() {
		return "Profile [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", email=" + email
				+ ", description=" + description + ", skills=" + skills + ", cities=" + cities + "]";
	}

	 
}
