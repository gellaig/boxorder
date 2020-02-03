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

@Entity
@Table(name = "profile")
public class Profile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long profile_id;
	
	private String firstname;
	
	private String lastname;
	
	@Email(message = "Email should be valid")
	private String email;
	
	 @Size(min = 10, max = 500, message 
		      = "Description must be between 10 and 500 characters")
	 private String description;
	
	 @OneToMany(fetch = FetchType.EAGER)
	 @Valid
	 private List<Skill> skills = new ArrayList<>();

}
