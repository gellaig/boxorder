package com.example.boxorderserver.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill {

	
	@Column(unique = true)
	@Basic(optional = false)
	private String name;
}
