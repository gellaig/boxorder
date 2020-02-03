package com.example.boxorderserver.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill {

	@Id
	@Column(unique = true)
	@Basic(optional = false)
	private String name;

	
	
	public Skill(String name) {
		this.name = name;
	}
	
	public Skill() {}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Skill [name=" + name + "]";
	}
	
	
	
}
